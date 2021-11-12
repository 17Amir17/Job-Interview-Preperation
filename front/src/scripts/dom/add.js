const add = document.querySelector('.add-question');

export function hideAdd() {
  add.classList.remove('display');
  add.classList.add('swoosh');
}

export function showAdd() {
  add.classList.add('display');
  add.classList.remove('swoosh');
}
