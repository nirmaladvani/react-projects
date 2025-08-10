import QRCode from 'react-qr-code'
import './style.css'
import { useState } from 'react'

export default function QrCodeGenerator() {
  const [temp, setTemp] = useState('')
  const [qrText, setQrtext] = useState('')

  return (
    <div className='acc-wrapper'>
      <div className='qr-code'>
        <h1>QR Code Generator</h1>
        <div className='conttt' style={{ margin: 10 }}>
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
        </div>
        <QRCode value={qrText} />
      </div>
    </div>
  )
}
