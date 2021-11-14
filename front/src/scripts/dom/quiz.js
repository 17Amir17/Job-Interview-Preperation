import swal from 'sweetalert2';
import { sendAnswer, sumbitScore } from '../api/api';
import { hideMenu, showMenu } from './menu';
import { hideTitle, showTitle } from './title';

const quiz = document.querySelector('.quiz');

let questions;
let curQuestIndex;
let score;
let session;
const questionTitle = document.querySelector('.question');
const difficulty = document.querySelector('.difficulty');
const questInputs = document.querySelectorAll('.ans');

export function hideQuiz() {
  quiz.classList.remove('display');
  quiz.classList.add('swoosh');
  showTitle();
}

export function showQuiz() {
  quiz.classList.add('display');
  quiz.classList.remove('swoosh');
  hideTitle();
}

export function start(res) {
  session = res.session;
  questions = res.questions;
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
  //Send backend answer
  sendAnswer(question._id, question.answers[ans], session);
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

function endQuiz() {
  showDialog();
}

async function showDialog() {
  try {
    const res = await swal.fire({
      title: 'Nice!',
      text: `Your score is ${score} do you wish to save to leaderboard?`,
      showDenyButton: true,
      confirmButtonText: 'Save',
    });
    if (res.isConfirmed) {
      saveScore();
    } else {
      hideQuiz();
      showMenu();
    }
  } catch (error) {
    console.log(error);
  }
}

async function saveScore() {
  swal
    .fire({
      text: 'Enter Name',
      input: 'text',
      allowOutsideClick: false,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        return sumbitScore(name, score, session)
          .then((response) => {
            if (!response.status === 200) {
              throw new Error(response.statusText);
            }
            return response;
          })
          .catch((error) => {
            swal.showValidationMessage(
              `Request failed: ${error.response.data.error}`
            );
          });
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        swal.fire({
          title: `Done!`,
        });
        hideQuiz();
        showMenu();
      }
    });
}
