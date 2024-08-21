import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ isSignedIn, children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }else if (!user.isAdmin){
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected
