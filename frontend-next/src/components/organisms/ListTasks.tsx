'use client'
import React, { useContext, useState, useEffect } from 'react';
import styles from './Pendig.module.css'
import { FormData, Task } from '../../../types';
import { TaskCtx } from '../../context/TaskCtx';
import { usePathname } from 'next/navigation';

const initialFormData = {
  id: 0,
  description: '',
  done: false
}



export default function ListTasks() {
  const [newTask, setNewTask] = useState('')
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [tasksList, setTasksList] = useState<Task[]>([])


  const taskContext = useContext(TaskCtx)
  const pathname = usePathname()
  if (!taskContext) {
    return <div>Error: Task context is not available</div>
  }
  const { tasks, createTask, deleteTask, updateTask, completeTask } = taskContext


  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log('formData',formData)
    updateTask(formData.id, formData.description)
    setShowEdit(false)
  }

  const handleAdd = (e: React.FormEvent<HTMLFormElement>, newTask: Task) => {
    e.preventDefault()
    createTask(newTask)
    setNewTask('')
  }

  const handleShowEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const id = parseInt(e.currentTarget.dataset.id || '')
      if (!id) throw new Error('id is not a number')
      const task = tasks.find(task => task.id === id)
      if (task) {
        setFormData({
          id: task.id,
          description: task.description,
          done: task.done
        })
        setShowEdit(true)
      }
    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    // setTasksList(tasks)

    if (pathname === '/home/all') {
      setTasksList(tasks)
    } else if (pathname === '/home/pending') {
      const tasksFiltered = tasks.filter(task => !task.done)
      setTasksList(tasksFiltered)
    } else if (pathname === '/home/completed') {
      const tasksFiltered = tasks.filter(task => task.done)
      setTasksList(tasksFiltered)
    }
  }, [tasks])

  return (
    <section className="h-screen w-full flex flex-col justify-center relative">
      {showEdit &&
        <div className={`${styles.modalBg} fixed top-0 right-0 bottom-0 left-0 w-full h-full`} >
          <form onSubmit={handleUpdateSubmit} className={`${styles.modal} modal absolute h-36 bg-slate-700 flex flex-col justify-center `}>
            <button
              type="button"
              className="w-24 self-end font-semibold text-white mr-8 mb-4 rounded-sm py-1 bg-red-500"
              onClick={() => setShowEdit(false)}
            >
              Exit</button>
            <input
              type="text"
              name="input"
              className="w-96 mx-auto bg-gray-200 px-2 py-1 rounded-sm focus:outline-none"
              value={formData.description ? formData.description : ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value || '' })}
            />
            <button type="submit" className="w-24 self-end text-center font-semibold bg-indigo-500 text-white px-4 py-1 rounded-sm mr-8 mt-4" >Update</button>
          </form>
        </div>
      }
      <div className="h-4/5 w-full bg-slate-700 rounded-sm">
        <h1 className="text-2xl text-slate-200 text-center py-6 font-bold">All Tasks of </h1>
        <div className="w-96 mx-auto flex gap-2 mb-8 ">
          <div className="w-full border-2 has-[input:focus-within]:border-indigo-500">
            <input
              type="text"
              className="bg-gray-200 w-full px-2 py-1 rounded-sm focus:outline-none"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)} />
          </div>

          <button className="font-semibold bg-indigo-500 text-white px-4 py-1 rounded-sm hover:bg-indigo-700 hover:font-bold"
            onClick={(e) => handleAdd(e, newTask)}
          >Add</button>
        </div>
        <div className="overflow-auto h-3/4" style={{ "scrollbarWidth": 'none' }}>
          {(tasksList?.length > 0) ?
            tasksList.map(task => {
              return (
                <div className="w-96 mx-auto mb-2 flex justify-between" key={task.id}>
                  <div>
                    <input type="checkbox" id={`${task.id}`}
                      onChange={() => completeTask(task.id)}
                      checked={task.done} />
                    <label htmlFor={`${task.id}`} className="pl-2 font-semibold text-slate-300 select-none">{task.description}</label>
                  </div>
                  <div className="flex gap-2">
                    <div className='flex items-center'>
                      <button className="bg-green-600 p-1 text-white font-semibold hover:bg-green-800 hover:font-bold h-8"
                        onClick={handleShowEdit}
                        data-id={task.id}>Edit</button>
                    </div>
                    <div className='flex items-center'>
                      <button className="bg-red-500 p-1 text-white font-semibold hover:bg-red-800 hover:font-bold h-8 w-16"
                        onClick={() => deleteTask(task.id)}
                        data-id={task.id}>Delete</button>
                    </div>
                  </div>
                </div>
              )
            })
            : <p className="text-center text-white">There is no task !</p>
          }
        </div>
      </div>

    </section>
  )
}