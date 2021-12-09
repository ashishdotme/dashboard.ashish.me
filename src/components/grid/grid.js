import Card from '../card/card'

const Grid = ({ items }) => {
  return (
    <div className="columns is-7 is-multiline">
      {items.map((item, index) => {
        return <Card item={item} key={index} />
      })}
    </div>
  )
}

export default Grid
