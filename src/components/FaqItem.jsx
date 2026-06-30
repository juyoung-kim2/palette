import { useState } from "react";

function FaqItem({ icon, question, answer }) {
  // 현재 상태값, 상태변경함수 / 초기값 open = false
  const [open, setOpen] = useState(false);

  const toggleFaq = () => {
    setOpen(!open);
  };

  const contentId = `faq-content-${question.slice(0, 10).replace(/\s/g, "-")}`;

  return (
    <div className={`faq-list ${open ? "open" : ""}`}>
      <button
        className="faq-head"
        onClick={toggleFaq}
        aria-expanded={open}
        aria-controls={contentId}
      >
        <img src={icon} alt="" aria-hidden="true" className="deco" />
        {question}
      </button>
      <div id={contentId} className="faq-content" aria-hidden={!open}>
        <div className="faq-inner">{answer}</div>
      </div>
    </div>
  );
}

export default FaqItem;
