import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import {
  saveUsers,
  getUsers,
  addTodoFunc,
  deleteTodoFunc,
  loginUserFunc,
  logoutUserFunc,
  RegisterUserFunc,
  loadUserDataFunc,
  sanitizeKey,
  saveTodosFunc,
  updateProfileImageFunc,
  updateTodoFunc,

 } from '../utils/appFunction';


// Create the context for global state
export const AppContext = createContext();

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
        await loadUserDataFunc(parsedUser.email, setTodos, setProfileImage);
      }
    })();
  }, []);


// Provide context values to children components
  return (
    <AppContext.Provider
      value={{
        user,
        todos,
        setTodos,
        profileImage,
        registerUser: (data) => RegisterUserFunc(data),
        loginUser: (email, password) => loginUserFunc(email, password, setUser, setTodos, setProfileImage),
        logoutUser: () => logoutUserFunc(setUser, setTodos, setProfileImage),
        saveTodos: (newTodos) => saveTodosFunc(newTodos, user, setTodos),
        addTodo: (todo) => addTodoFunc(todo, todos, user, setTodos),
        updateTodo: (id, updated) => updateTodoFunc(id, updated, todos, user, setTodos),
        deleteTodo: (id) => deleteTodoFunc(id, todos, user, setTodos),
        updateProfileImage: (uri) => updateProfileImageFunc(uri, user, setProfileImage),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
