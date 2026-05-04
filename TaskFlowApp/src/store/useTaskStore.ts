import { create } from 'zustand';

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
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

// Smart Priority Scoring Logic
const calculatePriority = (title: string, description: string): 'High' | 'Medium' | 'Low' => {
  const content = (title + ' ' + description).toLowerCase();
  
  const highKeywords = ['urgent', 'deadline', 'important', 'immediate', 'asap', 'exam', 'critical', 'අත්‍යවශ්‍ය'];
  const mediumKeywords = ['meeting', 'call', 'prepare', 'check', 'send', 'සකස්', 'කතා'];

  if (highKeywords.some(keyword => content.includes(keyword))) return 'High';
  if (mediumKeywords.some(keyword => content.includes(keyword))) return 'Medium';
  
  return 'Low';
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  addTask: (title, description) => {
    const priority = calculatePriority(title, description);
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'Pending',
      createdAt: Date.now(),
    };

    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' }
          : task
      ),
    }));
  },
}));
