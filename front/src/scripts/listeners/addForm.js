import { getInputsAndPost, hideAdd, showAdd, clearInputs } from '../dom/add';
import { hideMenu, showMenu } from '../dom/menu';

const diffDisplay = document.querySelector('.diff-display');
export function onAddClick(event) {
  onSliderChange({ target: { value: 5 } });
  hideMenu();
  showAdd();
}

export function onPostClick(event) {
  getInputsAndPost();
}

export function onSliderChange(event) {
  diffDisplay.innerText = event.target.value;
}

export function onBackClick(event) {
  clearInputs();
  hideAdd();
  showMenu();
}
