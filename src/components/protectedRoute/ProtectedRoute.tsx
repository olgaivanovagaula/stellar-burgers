import React from 'react'

const ProtectedRoute = ({ children}) => {
  const location = useLocation()
  const user = useSelector()


  return ()
}

export default ProtectedRoute