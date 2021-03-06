import React, { useState, useEffect, createContext, useContext } from 'react'
import { db } from '../.firebase'
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  doc,
} from 'firebase/firestore'

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])

  const addTask = async (_task) => {
    if (!_task) return

    setLoading(true)
    await addDoc(collection(db, 'tasks'), { ..._task, created_at: serverTimestamp() })
    setLoading(false)
  }
  const deleteTask = async (_id) => {
    if (!_id) return

    setLoading(true)
    await deleteDoc(doc(db, 'tasks', _id))
    setLoading(false)
  }
  const updateTask = async (_id, _newTask) => {
    if (!_id) return

    setLoading(true)
    await updateDoc(doc(db, 'tasks', _id), _newTask)
    setLoading(false)
  }
  const getTasks = () => {
    setLoading(true)
    // orderBy()
    onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const _tasks = snapshot.docs.map((doc) => {
        return {
          docId: doc.id,
          ...doc.data(),
        }
      })
      // .sort((x, y) => y.created_at - x.created_at)

      setTasks(_tasks)
    })
    setLoading(false)
  }

  useEffect(() => {
    return getTasks()
  }, [])

  const values = {
    addTask,
    deleteTask,
    updateTask,
    getTasks,
    loading,
    tasks,
  }
  return <DataContext.Provider value={values} children={children} />
}

const useDataContext = () => useContext(DataContext)

export { DataProvider, useDataContext }
