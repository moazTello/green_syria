import React from 'react'
import { useParams } from 'react-router-dom'

const Category = () => {
    const {category} = useParams();
  return (
    <div>{category}
    <p className='text-green-500 text-6xl'>
        asdasdasd</p>asdasd
    </div>
  )
}

export default Category