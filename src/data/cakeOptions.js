export const CAKE_OPTIONS = {
  cakeSheet: [
    { id: "sheet-base", name: "기본", price: 0, img: "option1_1.png" },
    { id: "sheet-choco", name: "초코 시트", price: 2000, img: "option1_2.png" },
    {
      id: "sheet-red",
      name: "레드벨벳 시트",
      price: 3000,
      img: "option1_3.png",
    },
    { id: "sheet-green", name: "녹차 시트", price: 3000, img: "option1_4.png" },
  ],
  cream: [
    { id: "cream-base", name: "생크림", price: 0, img: "option2_1.png" },
    { id: "cream-choco", name: "초코 크림", price: 2000, img: "option2_2.png" },
    {
      id: "cream-strawberry",
      name: "딸기 크림",
      price: 3000,
      img: "option2_3.png",
    },
    {
      id: "cream-sesame",
      name: "흑임자 크림",
      price: 4000,
      img: "option2_4.png",
    },
  ],
  deco: [
    {
      id: "blueberry",
      name: "블루베리",
      price: 300,
      img: "option3_1.png",
      previewImg: "blueberry.png",
    },
    {
      id: "strawberry",
      name: "딸기",
      price: 400,
      img: "option3_2.png",
      previewImg: "strawberry.png",
    },
    {
      id: "ribbonBlack",
      name: "리본(블랙)",
      price: 300,
      img: "option3_5.png",
      previewImg: "ribbonBlack.png",
    },
    {
      id: "ribbonPink",
      name: "리본(분홍)",
      price: 300,
      img: "option3_4.png",
      previewImg: "ribbonPink.png",
    },
    {
      id: "cookie",
      name: "곰돌이 쿠키",
      price: 500,
      img: "option3_3.png",
      previewImg: "cookie.png",
    },
  ],
};

export const BASE_PRICE = 50000;
export const DEFAULT_DECO_COUNTS = Object.fromEntries(
  CAKE_OPTIONS.deco.map((item) => [item.id, 0]),
);
// ➔ DEFAULT_DECO_COUNTS의 진짜 모습
// {
//   strawberry: 0,
//   choco: 0,
//   cherry: 0
// }

export const getDecoCountsFromItem = (item) => {
  // 수정이 아니면 기본값 반환 (0)
  if (!item?.selectedDeco) return DEFAULT_DECO_COUNTS;

  // 수정이면 이전 수량 복원
  return item.selectedDeco.reduce(
    (counts, deco) => ({
      ...counts, // 기존 수량 복사
      [deco.id]: deco.count, // 지금 데코의 id를 키로 삼아서 수량 새로 추가
    }),
    // 초기값
    { ...DEFAULT_DECO_COUNTS },
  );
};
