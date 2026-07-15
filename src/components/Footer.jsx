import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src="/images/logo.svg" alt="팔레트 로고" />
        </div>
        <div className="footer-content">
          <p>
            디자인&퍼블리싱 <br />
            김주영 이메일 juyoung0145@naver.com
            <br />
            깃허브
            <a
              href="https://github.com/juyoung-kim2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="깃허브 프로필 (새 창에서 열림)"
            >
              &nbsp; github.com/juyoung-kim2
            </a>
          </p>
          ㅎ
        </div>
      </div>
    </footer>
  );
}

export default Footer;
