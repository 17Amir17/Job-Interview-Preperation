import { getAllQuestions } from '../api/api';
import { hideMenu, showMenu } from '../dom/menu';
import { showQuiz } from '../dom/quiz';

export async function onStartClick(event) {
  //Hide menu
  hideMenu();
  //Get Questions
  await getQuestions();
  //After getting questions
  showQuiz();
}

async function getQuestions() {
  const questions = getAllQuestions();
  console.log(questions);
}
