import {
  onAddClick,
  onBackClick,
  onPostClick,
  onSliderChange,
} from './addForm';
import { onQuizClick } from './quizClick';
import { onStartClick } from './startClick';

const addBtn = document.querySelector('.add-btn');
const postBtn = document.querySelector('.post');
const difficultySlider = document.querySelector('#diff-range');
const addBack = document.querySelector('.add-back');
const startBtn = document.querySelector('.start-btn');
const quiz = document.querySelector('.quiz');
export function listen() {
  startBtn.addEventListener('click', onStartClick);
  quiz.addEventListener('click', onQuizClick);
  addBtn.addEventListener('click', onAddClick);
  postBtn.addEventListener('click', onPostClick);
  difficultySlider.addEventListener('change', onSliderChange);
  addBack.addEventListener('click', onBackClick);
}
