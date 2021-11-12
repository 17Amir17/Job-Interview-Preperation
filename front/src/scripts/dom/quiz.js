import { showMenu } from './menu';

const quiz = document.querySelector('.quiz');

let questions;
let curQuestIndex;
let score;
const questionTitle = document.querySelector('.question');
const difficulty = document.querySelector('.difficulty');
const questInputs = document.querySelectorAll('.ans');

export function hideQuiz() {
  quiz.classList.remove('display');
  quiz.classList.add('swoosh');
}

export function showQuiz() {
  quiz.classList.add('display');
  quiz.classList.remove('swoosh');
}

export function start(quest) {
  questions = quest;
  curQuestIndex = 0;
  score = 0;
  loadQuestion();
}

export function loadQuestion() {
  //Enable clicks
  quiz.classList.remove('disable');
  const question = questions[curQuestIndex];
  questionTitle.innerText = question.title;
  difficulty.innerText = question.difficulty;
  question.answers = shuffle(question.answers);
  for (let i = 0; i < 3; i++) {
    questInputs[i].innerText = question.answers[i];
  }
}

export async function ansClick(ans) {
  //Disable clicks
  quiz.classList.add('disable');
  const question = questions[curQuestIndex];
  const correctIndex = question.answers.indexOf(question.correctAnswer);
  if (correctIndex === ans) {
    score += question.difficulty;
  }
  await highlightAnswers(correctIndex);
  curQuestIndex++;
  if (curQuestIndex < questions.length) loadQuestion();
  else endQuiz();
}

function highlightAnswers(correct) {
  for (let i = 0; i < 3; i++) {
    if (i != correct) questInputs[i].classList.add('wrong');
    else questInputs[i].classList.add('correct');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        if (i != correct) questInputs[i].classList.remove('wrong');
        else questInputs[i].classList.remove('correct');
      }
      resolve();
    }, 1000);
  });
}

function endQuiz() {
  console.log(score);
  hideQuiz();
  showMenu();
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
