import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setActiveClass } from '../redux/navbar'

const ErrorPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActiveClass(""))
  }, [])
  return (
    <div className='flex place-self-center flex-col items-center pt-30 gap-5'>
      <h1 className='text-5xl font-bold'>404 - ERROR</h1>
      <Link to='/' onClick={() => dispatch(setActiveClass("Dashboard"))}> 
        <div className='text-blue-500 hover:underline'>Back to dashboard</div>
      </Link>
    </div>
  )
}

export default ErrorPage