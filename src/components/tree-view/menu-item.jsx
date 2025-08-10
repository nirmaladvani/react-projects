import { useState } from 'react'
import MenuList from './menu-list'
import { FaPlus, FaMinus } from 'react-icons/fa'

export default function MenuItem({ data = [] }) {
  const [displayCurrentChilden, setDisplayCurrentChildren] = useState({})

  function handleToggleChildren(getCurrentLabel) {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentlabel]: !displayCurrentChildren[getCurrentlabel],
    })
  }

  return (
    <div>
      <li>
        <p>{data.label}</p>
        {/* {data && data.children ? :  } */}
        {data && data.children ? <MenuList data={data.children} /> : null}
      </li>
    </div>
  )
}
