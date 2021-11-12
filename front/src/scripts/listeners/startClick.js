import { hideMenu, showMenu } from '../dom/menu';
import { showQuiz } from '../dom/quiz';

export function onStartClick(event) {
  hideMenu();
  showQuiz();
}
