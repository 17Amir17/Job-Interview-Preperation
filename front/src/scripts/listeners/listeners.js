import { onStartClick } from './startClick';

const startBtn = document.querySelector('.start-btn');

export function listen() {
  startBtn.addEventListener('click', onStartClick);
}
