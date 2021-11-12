import { showAdd } from '../dom/add';
import { hideMenu } from '../dom/menu';

export function onAddClick(event) {
  hideMenu();
  showAdd();
}
