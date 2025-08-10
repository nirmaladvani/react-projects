import { useState, useRef, useEffect } from 'react'
import './todo.css'

export default function Todo() {
  const [taskList, setTaskList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isEditingIndex, setIsEditingIndex] = useState(null)
  const [editInput, setEditInput] = useState('')
  const editInputRef = useRef(null)

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditingIndex])

  function handleAddTask() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    const newTask = { text: trimmed, completed: false }
    setTaskList([...taskList, newTask])
    setInputValue('')
  }

  function toggleComplete(index) {
    const updatedTasks = [...taskList]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTaskList(updatedTasks)
  }

  function handleDeleteTask(index) {
    const updatedTasks = [...taskList]
    updatedTasks.splice(index, 1)
    setTaskList(updatedTasks)
  }

  function handleEditTask(index) {
    setIsEditingIndex(index)
    setEditInput(taskList[index].text)
  }

  function handleSaveEdit(index) {
    const trimmed = editInput.trim()
    if (!trimmed) return
    const updatedTasks = [...taskList]
    updatedTasks[index].text = trimmed
    setTaskList(updatedTasks)
    setIsEditingIndex(null)
    setEditInput('')
  }

  function handleCancelEdit() {
    setIsEditingIndex(null)
    setEditInput('')
  }

  return (
    <div className='acc-wrapper'>
      <div className='todo-wrapper'>
        <h2>📝 To Do</h2>
        <div className='input-row'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder='Enter a task...'
          />
          <button onClick={handleAddTask} disabled={!inputValue.trim()}>
            ➕ Add
          </button>
        </div>

        {taskList.length > 0 ? (
          <ul className='task-list'>
            {[...taskList]
              .map((task, index) => ({ ...task, originalIndex: index }))
              .sort((a, b) => a.completed - b.completed)
              .map((taskObj) => {
                const index = taskObj.originalIndex
                const task = taskList[index]

                return (
                  <li
                    key={index}
                    className='task-item'
                    style={{
                      backgroundColor: task.completed ? '#3a3f4b' : '#5a4b6b',
                      opacity: task.completed ? 0.8 : 1,
                    }}
                  >
                    {isEditingIndex === index ? (
                      <input
                        ref={editInputRef}
                        type='text'
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit(index)
                          if (e.key === 'Escape') handleCancelEdit()
                        }}
                        className='edit-input'
                      />
                    ) : (
                      <span
                        onClick={() => toggleComplete(index)}
                        className={`task-text ${
                          task.completed ? 'completed' : ''
                        }`}
                      >
                        {task.text}
                      </span>
                    )}

                    <div className='action-buttons'>
                      {isEditingIndex === index ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(index)}
                            disabled={!editInput.trim()}
                            title='Save'
                          >
                            💾
                          </button>
                          <button onClick={handleCancelEdit} title='Cancel'>
                            ❌
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditTask(index)}
                            title='Edit'
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => toggleComplete(index)}
                            title='Toggle Complete'
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => handleDeleteTask(index)}
                            title='Delete'
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                )
              })}
          </ul>
        ) : (
          <p className='empty'>No tasks yet. Add one to get started!</p>
        )}
      </div>
    </div>
  )
}
