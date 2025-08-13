import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper to sanitize email for use as a key
// This replaces special characters with underscores to ensure valid keys
export const sanitizeKey = (email) => {
  return email.replace(/[^a-zA-Z0-9._-]/g, '_');
};

// Save users to secureStore
export const saveUsers = async (users) => {
    await SecureStore.setItemAsync('users', JSON.stringify(users));    
}

// Retrieve all users from secure store
export const getUsers = async () => {
    const users = await SecureStore.getItemAsync('users');
    // console.log(users)
    return users ? JSON.parse(users) : [];
};

// Register a new user
export const RegisterUserFunc = async (data) => {
    const users = await getUsers();
    const exists = users.find((u) => u.email === data.email);
    if(exists) throw new Error('User already exists');

    const newUsers = [...users, data]
    await saveUsers(newUsers);
}

// Login user and load their data
export const loginUserFunc = async (email, password, setUser, setTodos, setProfileImage) => {
    const users = await getUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password)
    if (foundUser) {
        await SecureStore.setItemAsync('loggedInUser', JSON.stringify(foundUser));
        setUser(foundUser);
        await loadUserDataFunc(email, setTodos, setProfileImage);
        return true;
    }
    return false;
}

// Logout user and clear state
export const logoutUserFunc = async (setUser, setTodos, setProfileImage) => {
    await SecureStore.deleteItemAsync('loggedInUser');
    setUser(null);
    setTodos([]);
    setProfileImage(null);
  };

  // Load todos and image for logged-in user
export const loadUserDataFunc = async (email, setTodos,setProfileImage) => {
  const safeEmail = sanitizeKey(email);
  const todosKey = `todos_${safeEmail}`;
  const imgKey = `profileImage_${safeEmail}`;

  const storedTodos = await AsyncStorage.getItem(todosKey);
  if (storedTodos) setTodos(JSON.parse(storedTodos));

  const storedImage = await SecureStore.getItemAsync(imgKey);
  if (storedImage) setProfileImage(storedImage);
  };

  // Save todos for the logged-in user
export const saveTodosFunc = async (newTodos, user, setTodos) => {
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
export const addTodoFunc = (todo, todos, user, setTodos) =>{
    const newTodo = {
      ...todo,
      completed: false,
      body: todo.body || "",
      createdAt: Date.now(),
    };
    saveTodosFunc([...todos, newTodo], user, setTodos)
  };

  // Update an existing todo
export const updateTodoFunc = (id, updatedTodo, todos, user, setTodos) => {
    const newTodos = todos.map((t) => 
    t.id === id ? {...t, ...updatedTodo} : t);
    saveTodosFunc(newTodos, user, setTodos)
  }

  // delete todo
export const deleteTodoFunc = (id, todos, user, setTodos) => saveTodosFunc(todos.filter((t) => t.id !== id), user, setTodos);

  // Update profile image for the logged-in user
export const updateProfileImageFunc = async (uri, user, setProfileImage) => {
    if (!user) return;
    const imgKey = `profileImage_${sanitizeKey(user.email)}`;
    setProfileImage(uri);
    await SecureStore.setItemAsync(imgKey, uri);
  };
