import { onAddClick } from './addClick';
import { onQuizClick } from './quizClick';
import { onStartClick } from './startClick';

const addBtn = document.querySelector('.add-btn');
const startBtn = document.querySelector('.start-btn');
const quiz = document.querySelector('.quiz');
export function listen() {
  startBtn.addEventListener('click', onStartClick);
  quiz.addEventListener('click', onQuizClick);
  addBtn.addEventListener('click', onAddClick);
}
