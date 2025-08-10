import { useMemo, useState } from 'react'
import validator from 'validator'

export default function PasswordValidator() {
  const [password, setPassword] = useState('')

  const options = useMemo(
    () => ({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    []
  )

  const isStrong = validator.isStrongPassword(password, options)

  const criteria = {
    length: password.length >= options.minLength,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }

  return (
    <div
      className='container'
      style={{ maxWidth: 500, margin: '2rem auto', lineHeight: 1.5 }}
    >
      <h2>Check password strength</h2>

      <label htmlFor='password' style={{ display: 'block', marginBottom: 8 }}>
        Enter password
      </label>
      <input
        id='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter a strong password'
        style={{ width: '100%', padding: '0.6rem', fontSize: '1rem' }}
        autoComplete='new-password'
      />

      {password !== '' && (
        <p
          style={{
            fontWeight: 'bold',
            color: isStrong ? 'green' : 'red',
            marginTop: '0.75rem',
          }}
          aria-live='polite'
        >
          {isStrong ? 'Strong password' : 'Not strong enough'}
        </p>
      )}

      <ul style={{ marginTop: '0.75rem' }}>
        <li style={{ color: criteria.length ? 'green' : 'red' }}>
          At least {options.minLength} characters
        </li>
        <li style={{ color: criteria.lower ? 'green' : 'red' }}>
          At least 1 lowercase letter
        </li>
        <li style={{ color: criteria.upper ? 'green' : 'red' }}>
          At least 1 uppercase letter
        </li>
        <li style={{ color: criteria.number ? 'green' : 'red' }}>
          At least 1 number
        </li>
        <li style={{ color: criteria.symbol ? 'green' : 'red' }}>
          At least 1 symbol
        </li>
      </ul>
    </div>
  )
}
