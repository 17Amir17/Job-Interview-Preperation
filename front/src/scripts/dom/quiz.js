const quiz = document.querySelector('.quiz');

export function hideQuiz() {
  quiz.classList.remove('swoosh');
}
export function showQuiz() {
  quiz.classList.add('display');
  quiz.classList.remove('swoosh');
}
