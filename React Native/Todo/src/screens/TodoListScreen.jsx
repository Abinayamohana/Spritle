import React, { useContext, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

// Main Todo List screen
export default function TodoListScreen({ navigation }) {
  // Get todos and actions from context
  const { todos, deleteTodo, saveTodos, } = useContext(AppContext);

  // Set navigation header buttons
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddEditTodo')}>
          <Ionicons name="add-circle" size={50} color="red" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={40} color="red" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Mark todo as completed and move to bottom
  const handleMoveToBottom = (id, swipeRef) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex((todo) => todo.id === id);

    if(index !== -1) {
      const [selectedTodo] = updatedTodos.splice(index, 1);
      selectedTodo.completed = true;  //Mark as completed
      updatedTodos.push(selectedTodo);
      saveTodos(updatedTodos);
      swipeRef?.close();
    }
  }

  // Delete Todo
  const handleDelete = (id, swipeRef) => {
    deleteTodo(id);
    swipeRef?.close();
  };

  // Render each todo item
  const renderItem = ({ item }) => (
    <TodoItem 
      item={item}
      navigation={navigation}
      handleMoveToBottom= {handleMoveToBottom}
      handleDelete= {handleDelete}
    />
  );

  // Main render
    return (
    <View style={styles.container}>
      {/* Show empty state if no todos */}
      {todos.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="happy-outline" size={60} color="gray" />
          <Text style={styles.emptyText}>You're all caught up!</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>    
  );
};

// Todo item component with swipe actions
function TodoItem({ item, navigation, handleMoveToBottom, handleDelete }) {
  const swipeRef = React.useRef(null);

  // Render swipe left actions (move & delete)
  const renderLeftAction = () => (
    <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity 
        style={styles.moveBtn}
        onPress={() => handleMoveToBottom(item.id, swipeRef.current)}>
        <Ionicons name='arrow-down-circle' size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id, swipeRef.current)}>
        <Ionicons name='trash' size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  // Render Todo item
  return(
    <Swipeable ref={swipeRef} renderLeftActions={renderLeftAction}>
      <View style={[styles.todoItem, item.completed && styles.completedList]}>
        <View style={styles.leftContent}>
          <View>
            <Text style={[styles.todoText, item.completed && styles.completedText]}>
              {item.title}
            </Text>
            {item.body ? (
              <Text style={[styles.body, item.completed && styles.completedText]}>
                 {item.body}
              </Text>
            ) : null}
          </View>
        </View>
        {/* Edit todo button */}
        <TouchableOpacity onPress={() => navigation.navigate('AddEditTodo', {todo: item})}>
          <Ionicons name="create" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </Swipeable>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f4f8',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoTitle : {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  body: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'sans-sarif',
    marginTop: 4,
  },
  todoText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  deleteBtn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
    color: 'gray',
  },
  moveBtn: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'white',
    fontWeight: '600',
    fontSize: 18

  },
  completedList: {
    backgroundColor: 'gray',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  

});
