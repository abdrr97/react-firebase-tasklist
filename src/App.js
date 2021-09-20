import React from 'react'
import TaskList from './components/Task/TaskList'
import { DataProvider } from './context/data-context'

const App = () => {
  return (
    <>
      <main className='container'>
        <DataProvider>
          <h1 className='display-3'>Task List</h1>
          <TaskList />
        </DataProvider>
      </main>
    </>
  )
}

export default App
