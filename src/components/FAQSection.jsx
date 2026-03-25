import FaqItem from './FaqItem'

function FAQSection() {
  const FaqData = [
    {
      icon: "/images/faq-icon01.png",
      question: "주문은 어떻게 진행하나요?",
      answer: "원하시는 케이크의 시크, 크림, 토핑을 선택한 뒤 주문서를 작성해주세요. 주문 접수 후 제작 일정 확인을 위해 안내 메시지가 발송됩니다."
    }, {
      icon: "/images/faq-icon02.png",
      question: "케이크 제작은 얼마나 걸리나요?",
      answer: "일반적으로 자적은 2~3일 전 예약을 권장합니다. 주문량에 따라 일정이 변동될 수 있으니 미리 예약해 주세요."
    }, {
      icon: "/images/faq-icon03.png",
      question: "픽업 또는 배송이 가능한가요?",
      answer: "기본적으로 매장 픽업을 원칙으로 하고 있습니다. 일부 지역에 한해 퀵 배송이 가능하며 별도의 배송비가 발생할 수 있습니다."
    }, {
      icon: "/images/faq-icon01.png",
      question: "주문 후 디자인 변경이 가능한가요?",
      answer: "제작 시작 전까지는 일부 디자인 변경이 가능합니다. 단, 제작이 시작된 이후에는 변경이 어려울 수 있습니다."
    }
  ]
  return (
    <section className="faq-section">
      <h2 className="en-title">FAQ</h2>
      <div className="faq-list-wrap">
        {FaqData.map((faq, index) => (
          <FaqItem
            key={index}
            icon={faq.icon}
            question={faq.question}
            answer={faq.answer} />
        ))}
      </div>
    </section>
  )
}

export default FAQSection