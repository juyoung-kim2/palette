import { useState } from 'react'

function FaqItem({ icon, question, answer }) {
  // 현재 상태값, 상태변경함수 / 초기값 open = false
  const [open, setOpen] = useState(false)

  const toggleFaq = () => {
    setOpen(!open)
  }

  return (
    <div className={`faq-list ${open ? "open" : ""}`}>
      <button className="faq-head" onClick={toggleFaq}>
        <img src={icon} alt="deco" className="deco" />{question}</button>
      <div className="faq-content">
        <div className="faq-inner">{answer}</div>
      </div>
    </div>
  )
}

export default FaqItem