import Swal from 'sweetalert2';
import { deleteQuestion, getAllQuestions, requestAdmin } from '../api/api';

const tbody = document.querySelector('tbody');
let auth;

export function login() {
  Swal.fire({
    title: 'Enter Administrator Password',
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off',
    },
    confirmButtonText: 'Login',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return requestAdmin(login)
        .then((response) => {
          auth = login;
          if (!response) {
            throw new Error('Bad login');
          }
          return response;
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Logged in`,
      }).then(() => {
        loadAdmin();
      });
    }
  });
}

export async function loadAdmin() {
  const questions = await getAllQuestions();
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
  for (const q of questions) {
    tbody.appendChild(
      createRowElement(
        q.title,
        q.correctAnswer,
        q.answers[1],
        q.answers[2],
        q.difficulty,
        q._id
      )
    );
  }
  tbody.addEventListener('click', onTableClick);
}

function createRowElement(title, correct, fake1, fake2, diff, id, number) {
  const titleE = createElement('td', title);
  const correctE = createElement('td', correct);
  const fake1E = createElement('td', fake1);
  const fake2E = createElement('td', fake2);
  const diffE = createElement('td', diff);
  const deleteE = createElement('td', '', {}, [
    createElement('button', '❌', {
      'data-id': id,
      class: 'del',
    }),
  ]);
  const th = createElement('th', number, { scope: 'row' });
  const tr = createElement('tr', '', {}, [
    th,
    titleE,
    correctE,
    fake1E,
    fake2E,
    diffE,
    deleteE,
  ]);
  return tr;
}

function createElement(tag, innerText = '', attributes = {}, children = []) {
  const elem = document.createElement(tag);
  elem.innerText = innerText;
  for (const att in attributes) {
    elem.setAttribute(att, attributes[att]);
  }
  for (const child of children) {
    elem.appendChild(child);
  }
  return elem;
}

function onTableClick(event) {
  if (event.target.classList.contains('del')) {
    deleteDialog(event.target.dataset.id);
  }
}

function deleteDialog(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteQuestion(id, auth).then(
        () => {
          Swal.fire('Deleted!', 'Question has been deleted.', 'success');
          loadAdmin();
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        }
      );
    }
  });
}
