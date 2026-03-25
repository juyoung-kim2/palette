function SideMenu({ menuOpen, closeMenu }) {
  return (
    <div className={` sideMenu ${menuOpen ? "open" : ""}`}>
      <div className='menu-dim' onClick={closeMenu}></div>
      <nav className="mobile-menu">
        <div className='menu-container'>

          <div className="menu-header">
            <button className="btn-close" onClick={closeMenu} ><img src="images/icon_close.png" alt="" /></button>
            <img src="images/logo.png" alt="" />
            <p><b>로그인</b>을 해주세요.</p>
          </div>

          <ul className="menu-list primary">
            <li><a href="#">마이페이지</a></li>
            <li><a href="#">주문내역</a></li>
            <li><a href="#">장바구니</a></li>
            <li><a href="#">1:1 문의</a></li>
            <li className="point"><a href="#">케이크 제작하기</a></li>
          </ul>
          <button className="btn btn-gray">로그아웃</button>
          <p className="copy">palette ©</p>
        </div>
      </nav>
    </div>

  )
}

export default SideMenu