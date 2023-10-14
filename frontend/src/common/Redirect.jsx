import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/dashboard')
    }, [])
    
  return (
    <div className='w-full h-screen bg-slate-900'><button>xxx</button></div>
  )
}

export default Redirect