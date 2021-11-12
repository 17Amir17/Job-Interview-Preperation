const quiz = document.querySelector('.quiz');

let questions;
let curQuestIndex;
const questionTitle = document.querySelectorAll('.question');
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
  console.log(quest);
  questions = quest;
  curQuestIndex = 0;
  loadQuestion();
}

export function loadQuestion() {
  const question = questions[curQuestIndex];
  questionTitle.innerText = question.title;
  for (let i = 0; i < 3; i++) {
    questInputs[i].innerText = question.answers[i];
    questInputs[i].dataset.ans = question.answers[i];
  }
  curQuestIndex++;
}

export function ansClick(ans) {
  console.log(ans);
}
