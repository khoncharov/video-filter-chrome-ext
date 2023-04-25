/* eslint-disable operator-linebreak */
import appState from '../../services/app-state';
import InputFormComponent from './input-form';
import createSaveItem from './save-item';

export default class SavesListComponent {
  private list = document.querySelector('ul#list-saves') as HTMLUListElement;

  private inputForm: InputFormComponent;

  constructor() {
    this.inputForm = new InputFormComponent();
  }

  update(): void {
    this.list.innerHTML = '';
    appState.savesMap.forEach((value, name) => {
      const item = createSaveItem(name);
      this.list.appendChild(item);

      const isSelected = item.dataset.name && item.dataset.name === appState.getCurrentSaveName();

      if (isSelected) {
        item.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  clearSelected(): void {
    this.list.querySelectorAll('input').forEach((input) => {
      if (input.checked) {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      }
    });
  }
}
