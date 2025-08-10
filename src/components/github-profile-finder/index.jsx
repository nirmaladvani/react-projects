import { useState } from 'react'
import './style.css'

export default function GitHubProfileFinder() {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')

  function handleSearch() {
    fetchData(username)
  }

  async function fetchData(username) {
    const url = `https://api.github.com/users/${username}`
    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      setProfile(data)
      console.log(data)
    } catch (e) {
      console.log(e.message)
      setErrorMessage(e.message)
      setLoading(false)
    }
  }

  if (loading === true) {
    ;<div>Loading</div>
  }

  if (errorMessage) {
    ;<div>{errorMessage}</div>
  }

  return (
    <div className='acc-wrapper' style={{ backgroundColor: '#EF7DE1' }}>
      <div className='container'>
        <div className='search-bar'>
          <input
            type='text'
            name='search'
            className='search'
            placeholder='Search GitHub Username...'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className='profile'>
          <img
            src={
              profile && profile.avatar_url
                ? profile.avatar_url
                : 'https://avatars.githubusercontent.com/u/55929607?v=4'
            }
            alt=''
          />
          <a
            href={
              profile && profile.avatar_url
                ? profile.html_url
                : 'https://api.github.com/users/devkapilbansal'
            }
          >
            {profile && profile.avatar_url ? profile.login : 'profile'}
          </a>
          <h3>
            User joined on &nbsp;
            {profile && profile.avatar_url
              ? profile.created_at
              : '9th March 2019'}
          </h3>
          <h3>
            Public Repos &nbsp;{' '}
            {profile && profile.avatar_url ? profile.public_repos : '12'}
          </h3>
          <h3>
            Followers &nbsp;{' '}
            {profile && profile.avatar_url ? profile.followers : '112'}
          </h3>
          <h3>
            Following &nbsp;{' '}
            {profile && profile.avatar_url ? profile.following : '11'}
          </h3>
        </div>
      </div>
    </div>
  )
}
