import moment from 'moment'
import React, { useState } from 'react'
import { useDataContext } from '../../context/data-context'

const FORM_STATUS = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
}

const TaskList = () => {
  const [item, setItem] = useState('')
  const [status, setStatus] = useState(false)
  const [formStatus, setFormStatus] = useState(FORM_STATUS.ADD)
  const [docId, setDocId] = useState('')

  const { loading, tasks, addTask, deleteTask, updateTask } = useDataContext()

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
            checked={Boolean(status)}
            onChange={(e) => setStatus(Boolean(e.target.checked))}
            type='checkbox'
          />
        </div>
        <button
          onClick={() => {
            if (formStatus === FORM_STATUS.ADD && item) {
              addTask({ item, status })
            } else if (formStatus === FORM_STATUS.UPDATE && item && docId) {
              updateTask(docId, { item, status })
            }
            setItem('')
            setStatus(false)
            setDocId('')
            setFormStatus(FORM_STATUS.ADD)
          }}
          className={
            formStatus === FORM_STATUS.ADD ? 'btn btn-sm btn-success' : 'btn btn-sm btn-warning'
          }
        >
          {formStatus === FORM_STATUS.ADD ? 'Add Task ' : 'Update Task'}
        </button>
      </section>

      {loading && <div className='spinner-border'></div>}

      <section className='list-group'>
        {tasks.length > 0 &&
          tasks.map(({ docId, item, created_at, status }) => {
            return (
              <article
                className='list-group-item d-flex justify-content-between align-items-center'
                key={docId}
              >
                <p style={{ textDecoration: status ? 'line-through' : '' }}>{item}</p>
                <div>
                  <small className='fw-lighter small fst-italic mx-2'>
                    {moment(created_at.toDate(), 'YYYYMMDD').fromNow()}
                  </small>
                  <div className='btn-group'>
                    <button
                      onClick={() => {
                        setItem(item)
                        setStatus(status)
                        setDocId(docId)
                        setFormStatus(FORM_STATUS.UPDATE)
                      }}
                      className='btn btn-sm btn-info'
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTask(docId)} className='btn btn-sm btn-danger'>
                      x
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
      </section>
    </>
  )
}

export default TaskList
