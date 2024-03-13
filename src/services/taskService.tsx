import axios from 'axios';

export async function fetchTasks() {
  try {
    const response = await axios.get("/api/tasks");
    return response.data.tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function createTask(taskData: any) {
  try {
    const response = await axios.post("/api/tasks", taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function updateTask(taskId: any, taskData: any) {
  try {
    const response = await axios.put(`/api/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(taskId: any) {
  try {
    const response = await axios.delete(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
