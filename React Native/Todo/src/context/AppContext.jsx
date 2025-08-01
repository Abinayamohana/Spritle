import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context for global state
export const AppContext = createContext();

// Helper to sanitize email for use as a key
// This replaces special characters with underscores to ensure valid keys
const sanitizeKey = (email) => {
  return email.replace(/[^a-zA-Z0-9._-]/g, '_');
};

export const AppProvider = ({ children }) => {
  // State for logged-in user
  const [user, setUser] = useState(null);
  // State for user's todos
  const [todos, setTodos] = useState([]);
  // State for user's profile image
  const [profileImage, setProfileImage] = useState(null);

  // On mount, check if user is logged in and load their data
  useEffect(() => {
    (async () => {
      const loggedUser = await SecureStore.getItemAsync('loggedInUser');
      if (loggedUser) {
        const parsedUser = JSON.parse(loggedUser);
        setUser(parsedUser);
        await loadUserData(parsedUser.email);
      }
    })();
  }, []);

  // Save users to SecureStore
  const saveUsers = async (users) => {
    await SecureStore.setItemAsync('users', JSON.stringify(users));
  };

  // Retrieve all users from secure store
  const getUsers = async () => {
    const users = await SecureStore.getItemAsync('users');
    console.log(users)
    return users ? JSON.parse(users) : [];
  };

  // Register a new user
  const registerUser = async (data) => {
    const users = await getUsers();
    const exists = users.find((u) => u.email === data.email);
    if (exists) throw new Error('User already exists');

    const newUsers = [...users, data];
    await saveUsers(newUsers);
  };

  // Login user and load their data
  const loginUser = async (email, password) => {
    const users = await getUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      await SecureStore.setItemAsync('loggedInUser', JSON.stringify(foundUser));
      setUser(foundUser);
      await loadUserData(email);
      return true;
    }
    return false;
  };

  // Logout user and clear state
  const logoutUser = async () => {
    await SecureStore.deleteItemAsync('loggedInUser');
    setUser(null);
    setTodos([]);
    setProfileImage(null);
  };

  // Load todos and image for logged-in user
  const loadUserData = async (email) => {
  const safeEmail = sanitizeKey(email);
  const todosKey = `todos_${safeEmail}`;
  const imgKey = `profileImage_${safeEmail}`;

  const storedTodos = await AsyncStorage.getItem(todosKey);
  if (storedTodos) setTodos(JSON.parse(storedTodos));

  const storedImage = await SecureStore.getItemAsync(imgKey);
  if (storedImage) setProfileImage(storedImage);
  };

  // Save todos for the logged-in user
  const saveTodos = async (newTodos) => {
    if (!user) return;

    //Sort: incomplete first, then completed    
  const sortedTodos = [...newTodos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Completed → bottom
    }
    return b.createdAt - a.createdAt; // Latest incomplete → top
  });
    setTodos(sortedTodos);
    const todosKey = `todos_${sanitizeKey(user.email)}`;
    await AsyncStorage.setItem(todosKey, JSON.stringify(sortedTodos));
  };

  // Add a new todo
  const addTodo = (todo) =>{
    const newTodo = {
      ...todo,
      completed: false,
      body: todo.body || "",
      createdAt: Date.now(),
    };
    saveTodos([...todos, newTodo])
  };

  // Update an existing todo
  const updateTodo = (id, updatedTodo) => {
    const newTodos = todos.map((t) => 
    t.id === id ? {...t, ...updatedTodo} : t);
    saveTodos(newTodos)
  }

  // delete todo
  const deleteTodo = (id) => saveTodos(todos.filter((t) => t.id !== id));

  // Update profile image for the logged-in user
  const updateProfileImage = async (uri) => {
    if (!user) return;
    const imgKey = `profileImage_${sanitizeKey(user.email)}`;
    setProfileImage(uri);
    await SecureStore.setItemAsync(imgKey, uri);
  };

// Provide contex values to children components
  return (
    <AppContext.Provider
      value={{
        user,
        todos,
        setTodos,
        saveTodos,
        profileImage,
        registerUser,
        loginUser,
        logoutUser,
        addTodo,
        updateTodo,
        deleteTodo,
        updateProfileImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
