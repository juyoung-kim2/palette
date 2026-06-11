/**
 * 애플리케이션 라우트 경로 상수.
 * 경로 문자열을 여러 곳에서 직접 쓰면 오타가 생기기 쉽습니다.
 * 이 파일을 단일 출처(source of truth)로 사용하세요.
 *
 * @example
 * import ROUTES from "@/constants/routes";
 * <Link to={ROUTES.CART}>장바구니</Link>
 */
const ROUTES = {
  HOME: "/",
  ORDER: "/order",
  CART: "/cart",
  ORDER_SHEET: "/order-sheet",
  ORDER_COMPLETE: "/order-complete",
  MYPAGE: "/mypage",
  MYPAGE_ORDER_LIST: "/mypage-order-list",
  MYPAGE_ORDER_DETAIL: "/mypage-order-detail",
  MYPAGE_QNA_LIST: "/mypage-qna-list",
  MYPAGE_QNA_DETAIL: "/mypage-qna-detail",
};

export default ROUTES;
