const menu = document.querySelector('.menu');

export function hideMenu() {
  menu.classList.remove('display');
  menu.classList.add('swoosh');
}

export function showMenu() {
  menu.classList.remove('swoosh');
  menu.classList.add('display');
}
