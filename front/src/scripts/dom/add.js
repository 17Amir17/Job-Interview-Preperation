import swal from 'sweetalert2';
import { postQuestion } from '../api/api';
import { showMenu } from './menu';

const add = document.querySelector('.add-question');
const correct = document.querySelector('.real');
const fake = document.querySelectorAll('.fake');
const title = document.querySelector('.title');
const difficulty = document.querySelector('#diff-range');

export function hideAdd() {
  add.classList.remove('display');
  add.classList.add('swoosh');
}

export function showAdd() {
  add.classList.add('display');
  add.classList.remove('swoosh');
}

export function getInputsAndPost() {
  const question = {
    title: title.value,
    correctAnswer: correct.value,
    answers: [correct.value, fake[0].value, fake[1].value],
    difficulty: difficulty.value,
  };
  if (validate(question)) {
    postQuestion(question);
    swal.fire('Question added');
    clearInputs();
    hideAdd();
    showMenu();
  } else
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid input!',
    });
}

function validate(question) {
  const isFalse = (val) => {
    return !val || val === '';
  };
  if (isFalse(question.title)) return false;
  if (isFalse(question.correctAnswer)) return false;
  for (const ans of question.answers) if (isFalse(ans)) return false;
  return true;
}

export function clearInputs() {
  title.value = '';
  correct.value = '';
  for (const f of fake) f.value = '';
  difficulty.value = 5;
}
