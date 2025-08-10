import MenuList from './menu-list'

export default function TreeView({ data = [] }) {
  //   console.log(data)
  return (
    <div>
      <MenuList data={data} />
    </div>
  )
}
