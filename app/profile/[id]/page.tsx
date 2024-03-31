import React from 'react'

const UserProfile = ( {params}: 
  {params: {id: string}} ) => {
  return (
    <div>UserProfile {params.id}</div>
  )
}

export default UserProfile