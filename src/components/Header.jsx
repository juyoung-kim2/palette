import { useEffect, useState } from 'react'

function Header({ variant, openMenu }) {

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      console.log(scrollTop)
      setIsScrolled(scrollTop > 50)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [bannerOpen, setBannerOpen] = useState(true)

  const closeBanner = () => {
    setBannerOpen(false)
  }

  return (
    <header className={`header ${variant} ${isScrolled ? "is-scrolled" : ""}`}>

      {variant === "main" && (
        <>
          <div className={`header-top ${bannerOpen ? "" : "remove"}`}>
            <div className="top-inner">
              <p>회원가입 후 팔레트의 이벤트를 확인하세요!</p>

              <button className="btn-close" onClick={closeBanner}>
                <img src="/images/icon_close.png" alt="close" />
              </button>
            </div>
          </div>

          <div className="header_inner">
            <div className="header-logo">
              <img src="/images/logo-w.png" alt="logo" className="logo-w" />
              <img src="/images/logo.png" alt="logo" className="logo-b" />
            </div>

            <div className="header-right">
              <a href="#"><img className="icon" src="/images/icon-cart-w.png" alt="장바구니" /></a>
              <a href="#"><img className="icon" src="/images/icon-user-w.png" alt="마이페이지" /></a>
              <button type='button' className='menu-btn' onClick={openMenu}><img className="icon" src="/images/icon-menu-w.png" alt="메뉴" /></button>
            </div>
          </div>
        </>
      )}

      {variant === "sub" && (
        <div className="header_inner">

          <div>
            <a href="#">
              <img className="icon" src="/images/icon_arrow_l.png" alt="뒤로가기" />
            </a>
          </div>

          <div className="header-right">
            <a href="#"><img className="icon" src="/images/icon_cart.png" alt="장바구니" /></a>
            <a href="#"><img className="icon" src="/images/icon_user.png" alt="마이페이지" /></a>
            <button type='button' className='menu-btn' onClick={openMenu}><img className="icon" src="/images/icon_menu.png" alt="메뉴" /></button>
          </div>

        </div>
      )}

    </header>
  )
}

export default Header