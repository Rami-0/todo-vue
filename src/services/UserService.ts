import axios from '@/services/api.ts'; // Import your Axios instance
import { setData } from '@/store/deviceFingerprint.ts';

export async function addTodos(userId: string, todos: any) {

  if(!todos || todos[0].value.length === 0){
    throw new Error;
  }
  try {
    // Fetch the user by userId
    const response = await axios.get(`/Users/${userId}`);

    if (response.data) {
      // User found, add new todos
      response.data.todos = [...response.data.todos, ...todos];

      // Update the user with new todos
      await axios.put(`/Users/${userId}`, response.data);

      setData(response.data)
      // Return the updated user data
      return response.data;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error adding todos:', error);
    throw error;
  }
}

export async function changeTodoStatus(userId: string, todoId: any, newStatus: boolean) {
  try {
    const response = await axios.get(`/Users/${userId}`);

    if (response.data) {
      const todoIndex = response.data.todos.findIndex((todo: any) => todo.id === todoId);

      if (todoIndex !== -1) {
        response.data.todos[todoIndex].checked = newStatus;

        await axios.put(`/Users/${userId}`, response.data);

        return response.data;
      } else {
        // Todo item not found, handle accordingly (e.g., show an error)
        throw new Error('Todo item not found');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error changing todo status:', error);
    throw error;
  }
}


export async function updateTodo(userId : string, todoId: any, updatedTodo: any) {
  try {
    const response = await axios.get(`/Users/${userId}`);

    if (response.data) {
      const todoIndex = response.data.todos.findIndex((todo: any) => todo.id === todoId);

      if (todoIndex !== -1) {
        response.data.todos[todoIndex].value = updatedTodo;

        await axios.put(`/Users/${userId}`, response.data);

        setData(response.data);
        return response.data;
      } else {
        throw new Error('Todo item not found');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

export async function deleteTodo(userId: string, todoId: string) {
  try {
    // Fetch the user by userId
    const response = await axios.get(`/Users/${userId}`);

    if (response.data) {
      const updatedTodos = response.data.todos.filter((todo: any) => todo.id !== todoId);
      response.data.todos = updatedTodos;

      await axios.put(`/Users/${userId}`, response.data);

      setData(response.data);
      return response.data;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}



