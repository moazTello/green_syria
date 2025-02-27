import React from 'react'
import { images } from '../constants'
const Home = () => {
  return (
    <div className='bg-gradient-to-t from-[#33663b] to-[#55B063] h-[100vh]'>
      <div className='w-full flex justify-center items-center relative'>
        <p className='text-green-800 absolute top-14 text-xl md:text-4xl md:right-[30%] right-[20%]'>شكراً </p>
        <p className='text-orange-700 absolute top-24 md:top-28 text-sm md:text-lg md:right-[32%] right-[22%]'> للكادر الداعم لهذا المشروع</p>
        <img className='my-5 w-[80%] md:w-[50%] rounded-lg' alt="" src={images.homeImage}/>
      </div>
    </div>
  )
}

export default Home