import { onQuizClick } from './quizClick';
import { onStartClick } from './startClick';

const startBtn = document.querySelector('.start-btn');
const quiz = document.querySelector('.quiz');
export function listen() {
  startBtn.addEventListener('click', onStartClick);
  quiz.addEventListener('click', onQuizClick);
}
