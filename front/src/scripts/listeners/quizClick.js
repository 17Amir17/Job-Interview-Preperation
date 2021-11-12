import { ansClick } from '../dom/quiz';

export function onQuizClick(event) {
  if (event.target.classList.contains('ans')) {
    ansClick(event.target.dataset.ans);
  }
}
