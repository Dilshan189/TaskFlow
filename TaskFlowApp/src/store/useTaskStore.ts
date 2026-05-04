import { create } from 'zustand';
import { 
  getDBConnection, 
  createTable, 
  getTasks, 
  saveTask, 
  updateTaskStatus, 
  deleteTaskFromDB 
} from '../services/dbService';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
  createdAt: number;
}

interface TaskState {
  tasks: Task[];
  initDB: () => Promise<void>;
  addTask: (title: string, description: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

const calculatePriority = (title: string, description: string): 'High' | 'Medium' | 'Low' => {
  const content = (title + ' ' + description).toLowerCase();
  const highKeywords = ['urgent', 'deadline', 'important', 'immediate', 'asap', 'exam', 'critical', 'අත්‍යවශ්‍ය'];
  const mediumKeywords = ['meeting', 'call', 'prepare', 'check', 'send', 'සකස්', 'කතා'];

  if (highKeywords.some(keyword => content.includes(keyword))) return 'High';
  if (mediumKeywords.some(keyword => content.includes(keyword))) return 'Medium';
  return 'Low';
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  initDB: async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedTasks = await getTasks(db);
      set({ tasks: storedTasks });
    } catch (error) {
      console.error("DB Initialization Error:", error);
    }
  },

  addTask: async (title, description) => {
    const priority = calculatePriority(title, description);
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'Pending',
      createdAt: Date.now(),
    };

    try {
      const db = await getDBConnection();
      await saveTask(db, newTask);
      set((state) => ({
        tasks: [newTask, ...state.tasks],
      }));
    } catch (error) {
      console.error("Add Task Error:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      const db = await getDBConnection();
      await deleteTaskFromDB(db, id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Delete Task Error:", error);
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';

    try {
      const db = await getDBConnection();
      await updateTaskStatus(db, id, newStatus);
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, status: newStatus } : t
        ),
      }));
    } catch (error) {
      console.error("Toggle Task Error:", error);
    }
  },
}));
