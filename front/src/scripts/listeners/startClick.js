import { getAllQuestions } from '../api/api';
import { hideMenu, showMenu } from '../dom/menu';
import { hideQuiz, showQuiz, start } from '../dom/quiz';

export async function onStartClick(event) {
  //Hide menu
  hideMenu();
  //Get Questions
  await getQuestions();
  //After getting questions
  showQuiz();
}

async function getQuestions() {
  try {
    start(await getAllQuestions(true));
  } catch (error) {
    alert('Something went wrong');
    setTimeout(() => {
      hideQuiz();
      showMenu();
    }, 100);
  }
}
