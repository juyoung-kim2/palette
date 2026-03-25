import "../style.css"
import LeftBanner from "../components/LeftBanner"
import HeroSection from '../components/HeroSection'
import BrandSection from '../components/BrandSection'
import HowToOrderSection from '../components/HowToOrderSection'
import FAQSection from '../components/FAQSection'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "../Pages/Home"
import Order from "../Pages/Order"

import { useEffect } from 'react';
import { initSite } from '../js/script';
import FaqItem from '../components/FaqItem';
import SideMenu from '../components/SideMenu';
function App() {

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const openMenu = (e) => {
    e.preventDefault()
    setMenuOpen(true)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }
  return (
    <>
      <div className="content-wrapper">
        <div id="leftBanner">
          <LeftBanner />
        </div>

        <main className="main-section">
          <Header variant="main" openMenu={openMenu} />
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
          <HeroSection />
          <BrandSection />
          <HowToOrderSection />
          <FAQSection />
          <Footer />
        </main>
      </div>

    </>
  )
}

export default App