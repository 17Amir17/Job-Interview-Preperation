import { create } from '../../../../back/scripts/mongo/models/users';
import { getLeaderboard } from '../api/api';

const tbody = document.querySelector('tbody');

export async function loadLeaderboard() {
  const leaderboardValues = await getLeaderboard();
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
  let i = 1;
  for (const row of leaderboardValues) {
    tbody.appendChild(createRowElement(row.name, row.score, i));
    i++;
  }
}

function createRowElement(name, score, number) {
  const nameE = createElement('td', name);
  const scoreE = createElement('td', score);
  const th = createElement('th', number, { scope: 'row' });
  const tr = createElement('tr', '', {}, [th, nameE, scoreE]);
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
