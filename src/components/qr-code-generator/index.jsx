import QRCode from 'react-qr-code'
import './style.css'
import { useState } from 'react'

export default function QrCodeGenerator() {
  const [temp, setTemp] = useState('')
  const [qrText, setQrtext] = useState('')

  return (
    <div className='acc-wrapper'>
      <h1>QR Code Generator</h1>
      <input
        type='text'
        name='qr-text'
        id='qr-text'
        placeholder='Enter your value here'
        onChange={() => {
          setTemp(event.target.value)
        }}
      />
      <button
        onClick={() => {
          setQrtext(temp)
        }}
      >
        Generate
      </button>
      <QRCode value={qrText} />
    </div>
  )
}
