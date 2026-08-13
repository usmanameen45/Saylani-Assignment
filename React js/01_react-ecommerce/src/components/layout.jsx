import React from 'react'
import { Outlet } from 'react-router'
import Header from './common/header.jsx'
import Footer from './common/footer.jsx'

const Lyout = () => {
  return (
    <div className="bg-cream min-h-screen text-ink transition-colors duration-300">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Lyout