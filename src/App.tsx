import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./api/mockApi";
import TodoList from "./components/TodoList";
import EditTodoModal from "./components/EditTodoModal";
import AddTodoModal from "./components/AddTodoModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorAlert from "./components/ErrorAlert";
import TodoSkeleton from "./components/TodoSkeleton";
import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (err) {
      setError("Failed to load todos. Please try again.");
      console.error("Error loading todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (
    todoData: Omit<Todo, "id" | "completed" | "createdAt">
  ): Promise<void> => {
    try {
      setAdding(true);
      setError(null);

      const todoWithDefaults = {
        ...todoData,
        completed: false,
        createdAt: new Date(),
      };

      const response = await addTodo(todoWithDefaults);

      if (response.success && response.data) {
        setTodos((prev) => [...prev, response.data as Todo]);
      } else {
        throw new Error(response.message || "Failed to add todo");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add todo. Please try again."
      );
      console.error("Error adding todo:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleToggleTodo = async (id: number): Promise<void> => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      setError(null);
      const response = await updateTodo(id, {
        completed: !todoToUpdate.completed,
      });

      if (response.success && response.data) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } else {
        throw new Error(response.message || "Failed to update todo");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update todo. Please try again."
      );
      console.error("Error updating todo:", err);
    }
  };

  const handleEditTodo = (todo: Todo): void => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (
    id: number,
    updates: Partial<Todo>
  ): Promise<void> => {
    try {
      setSaving(true);
      setError(null);
      const response = await updateTodo(id, updates);

      if (response.success && response.data) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
        );
        setIsEditModalOpen(false);
        setEditingTodo(null);
      } else {
        throw new Error(response.message || "Failed to update todo");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update todo. Please try again."
      );
      console.error("Error updating todo:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (todo: Todo): void => {
    setDeletingTodo(todo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!deletingTodo) return;

    try {
      setDeleting(true);
      setError(null);
      const response = await deleteTodo(deletingTodo.id);

      if (response.success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== deletingTodo.id));
      } else {
        throw new Error(response.message || "Failed to delete todo");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete todo. Please try again."
      );
      console.error("Error deleting todo:", err);
    } finally {
      setDeleting(false);
      setDeletingTodo(null);
    }
  };

  const dismissError = (): void => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My ToDo List
          </h1>
          <p className="text-gray-600">Organize your tasks easly</p>
        </div>

        {/* Error Alert */}
        {error && <ErrorAlert message={error} onDismiss={dismissError} />}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Stats and Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <svg
                className="w-6 h-6 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Tasks
              </h2>
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {todos.length} {todos.length === 1 ? "task" : "tasks"}
              </span>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className=" sm:w-auto  cursor-pointer px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Task
            </button>
          </div>

          {/* Todo List with Spin Loader for Adding */}
          {loading ? (
            <div className="space-y-3">
              <TodoSkeleton />
              <TodoSkeleton />
              <TodoSkeleton />
            </div>
          ) : (
            <div className="space-y-3">
              <TodoList
                todos={todos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteClick}
                onEdit={handleEditTodo}
              />
              {/* Show spin loader while adding */}
              {adding && (
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner size="lg" text="Adding your task..." />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Empty State */}
        {!loading && todos.length === 0 && !adding && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first task!
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Add Your First Task
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTodo}
        loading={adding}
      />

      <EditTodoModal
        todo={editingTodo}
        onSave={handleSaveEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTodo(null);
        }}
        loading={saving}
        isOpen={isEditModalOpen}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingTodo(null);
        }}
        onConfirm={handleConfirmDelete}
        todo={deletingTodo}
        loading={deleting}
      />
    </div>
  );
};

export default App;
