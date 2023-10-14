import React from 'react'

const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-400">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-2xl text-white">Page Not Found</p>
        <a href="/" className="mt-4 text-lg text-white hover:underline">Go Back to Home</a>
      </div>
    </>
  )
}

export default PageNotFound


