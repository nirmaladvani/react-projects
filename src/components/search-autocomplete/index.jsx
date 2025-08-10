import './style.css'
import { useEffect, useState } from 'react'

export default function SearchAutoComplete() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [change, setChange] = useState('')

  function handleChange() {
    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().startsWith(change.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  async function fetchData() {
    setLoading(true)
    try {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()
      console.log(data.users)
      setUsers(data.users)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setErrorMessage(e.message || 'An error occurred')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    handleChange()
  }, [change, users])

  if (loading) {
    return <div>Loading...</div>
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>
  }

  return (
    <div className='acc-wrapper'>
      <input
        type='text'
        placeholder='Search Users here...'
        onChange={(event) => {
          setChange(event.target.value)
        }}
      />
      {change && change.length > 0 ? (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
