import { ansClick } from '../dom/quiz';

export function onQuizClick(event) {
  if (event.target.classList.contains('ans')) {
    ansClick(Number(event.target.dataset.ans));
  }
}
