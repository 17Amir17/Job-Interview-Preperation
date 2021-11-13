const title = document.querySelector('h1');

export function hideTitle() {
  title.classList.add('swoosh');
}

export function showTitle() {
  title.classList.remove('swoosh');
}
