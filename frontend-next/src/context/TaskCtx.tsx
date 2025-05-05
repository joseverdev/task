'use client'
import { createContext, useEffect, useState, ReactNode } from "react";
import { Task } from "../../types";

interface TaskContextType {
  tasks: Task[];
  createTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (id: number, description: string) => Promise<void>;
  completeTask: (id: number) => Promise<void>;
}

export const TaskCtx = createContext<TaskContextType | null>(null);


export function Tasks({ children }: { children: ReactNode }) {
  
  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    try {
      // const tasks = await getTasks()
      const response = await fetch('http://localhost:3000/api/tasks')

      const data = await response.json()
      const resTasks = data.tasks
      // console.log('resTasks',resTasks)
      setTasks(resTasks)
    } catch (error) {
      console.log('Error en getTaskCtx',error)
    }
  }
  
  const createTask = async (task:Task) => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: task})
      })
      const data = await response.json()
      console.log('data',data)
      getTasks()
    } catch (error) {
      console.log('Error en createTask',error)
    }
  }

  const deleteTask = async (id:number) => {
    try {
      await fetch('http://localhost:3000/api/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      });
      getTasks()
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id:number, description:string) => {
    try {
      await fetch('http://localhost:3000/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, description})
      });
      getTasks()
    } catch (error) {
      console.log(error);
    }
  }

  const completeTask = async (id:number) => {
    try {
      await fetch('http://localhost:3000/api/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      });
      getTasks()
    } catch (error) {
      console.log(error);
    }
  }

  const data = {
    tasks,
    createTask,
    deleteTask,
    updateTask,
    completeTask
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <TaskCtx.Provider value={data}>
      {children}
    </TaskCtx.Provider>
  )
}


