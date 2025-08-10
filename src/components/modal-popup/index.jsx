import { useState } from 'react'
import './style.css'

export default function ModalPopup() {
  const [open, setOpen] = useState(false)

  function handlePopup() {
    setOpen(true)
  }

  function handleClosePopup() {
    setOpen(false)
  }

  return (
    <div className='acc-wrapper'>
      <button onClick={handlePopup}>Open Modal Popup</button>
      {open === true ? (
        <div className='modal-container'>
          <div>Popup</div>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      ) : null}
    </div>
  )
}
