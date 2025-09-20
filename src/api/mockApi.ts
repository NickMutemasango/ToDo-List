import { Todo, ApiResponse } from '../types';

const STORAGE_KEY = 'todos-app-data';

const getTodosFromStorage = (): Todo[] => {
  const todosJson = localStorage.getItem(STORAGE_KEY);
  if (todosJson) {
    const todos = JSON.parse(todosJson);
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  }
  return [];
};

const saveTodosToStorage = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = async (): Promise<Todo[]> => {
  await delay(800);
  return getTodosFromStorage();
};

export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<ApiResponse> => {
  await delay(1000);
  try {
    const todos = getTodosFromStorage();
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
    };
    const updatedTodos = [...todos, newTodo];
    saveTodosToStorage(updatedTodos);
    return { success: true, data: newTodo };
  } catch (error) {
    return { success: false, message: 'Failed to add todo' };
  }
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<ApiResponse> => {
  await delay(600);
  try {
    const todos = getTodosFromStorage();
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    );
    saveTodosToStorage(updatedTodos);
    const updatedTodo = updatedTodos.find(todo => todo.id === id);
    return { success: true, data: updatedTodo };
  } catch (error) {
    return { success: false, message: 'Failed to update todo' };
  }
};

export const deleteTodo = async (id: number): Promise<ApiResponse> => {
  await delay(500);
  try {
    const todos = getTodosFromStorage();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodosToStorage(updatedTodos);
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Failed to delete todo' };
  }
};