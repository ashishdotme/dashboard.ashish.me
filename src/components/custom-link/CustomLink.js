import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const CustomLink = ({ children, to, colorStart, colorHover, addtionalStyle = null }) => {
  const theLink = useRef(null)

  useEffect(() => {
    theLink.current.style.backgroundColor = colorStart
  }, [])

  const handleMouseEnter = () => {
    theLink.current.style.backgroundColor = colorHover
  }

  const handleMouseLeave = () => {
    theLink.current.style.backgroundColor = colorStart
  }

  return (
    <Link
      ref={theLink}
      to={to}
      style={addtionalStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  )
}

export default CustomLink
