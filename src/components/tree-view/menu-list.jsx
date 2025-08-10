import MenuItem from './menu-item'

export default function MenuList({ data = [] }) {
  return (
    <ul>
      {data && data.length > 0
        ? data.map((item, index) => {
            return (
              //   <div key={index}>
              <MenuItem data={item} key={index} />
              //   </div>
            )
          })
        : null}
    </ul>
  )
}
