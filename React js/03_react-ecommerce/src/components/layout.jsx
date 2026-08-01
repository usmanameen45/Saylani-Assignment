import React from 'react'
import { Outlet } from 'react-router'
import Header from './common/header.jsx'
import Footer from './common/footer.jsx'

const Lyout = () => {
  return (
    <div style={{ backgroundColor: "#FBF7F2" }}>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Lyout