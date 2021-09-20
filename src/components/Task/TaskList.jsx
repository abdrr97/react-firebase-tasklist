import React, { useState } from 'react'
import { useDataContext } from '../../context/data-context'

const TaskList = () => {
  const [item, setItem] = useState('')
  const [status, setStatus] = useState(false)

  const { loading, tasks, addTask } = useDataContext()

  const handlClick = () => {
    if (item) {
      addTask({ item, status })

      setItem('')
      setStatus(false)
    }
  }

  return (
    <>
      <section className='mb-5'>
        <h3 className='display-5'>Task Form</h3>
        <div className='d-flex align-items-center'>
          <input
            placeholder='Enter Your Task'
            className='form-control mb-3'
            value={item}
            onChange={(e) => setItem(e.target.value)}
            type='text'
          />
          <input
            className='form-check mx-3 mb-3'
            value={status}
            checked={Boolean(status)}
            onChange={(e) => setStatus(e.target.value)}
            type='checkbox'
          />
        </div>
        <button onClick={() => handlClick()} className='btn btn-sm btn-success'>
          Add Task
        </button>
      </section>

      <section className='list-group'>
        {tasks.length > 0 &&
          tasks.map(({ docId, item, status }) => {
            return (
              <article
                className='list-group-item'
                style={{ textDecoration: status ? 'line-through' : '' }}
                key={docId}
              >
                {item}
              </article>
            )
          })}
      </section>
    </>
  )
}

export default TaskList
