function HowToOrderSection() {
  return (
    <section className="how-to-order-section">
      <h2 className="en-title">How to order</h2>
      <div className="order-step-group">
        <div className="order-step step-1">
          <img src="/images/step_img1.png" alt="" />
          <p className="step-num"><span>STEP 1</span></p>
          <h3 className="en-title">Your Taste, Your Style</h3>
          <p>원하는 시트, 크림, 토핑을 선택해주세요.</p>
        </div>
        <div className="order-step step-2">
          <img src="/images/step_img2.png" alt="" />
          <p className="step-num"><span>STEP 2</span></p>
          <h3 className="en-title">Tell Us Your Story</h3>
          <p>전하고 싶은 메시지, 특별한 순간의 의미를 알려주세요.</p>
        </div>
        <div className="order-step step-3">
          <img src="/images/step_img3.png" alt="" />
          <p className="step-num"><span>STEP 3</span></p>
          <h3 className="en-title">Freshly Made for You</h3>
          <p>당신만을 위한 케이크를 정성껏 제작해드립니다.</p>
        </div>
      </div>
    </section>
  )
}

export default HowToOrderSection