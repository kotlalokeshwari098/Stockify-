// import React from 'react'
import { Outlet } from 'react-router-dom'
import UserFooter from '../components/UserFooter'
import UserHeader from '../components/UserHeader'


const AppUserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  )
}

export default AppUserLayout