/* eslint-disable operator-linebreak */
import AppStateService from '../../services/app-state';
import createSaveItem from './save-item';
import InputFormComponent from './input-form';

export default class SavesListComponent {
  private list = document.querySelector('ul#list-saves') as HTMLUListElement;

  private inputForm: InputFormComponent;

  private appState: AppStateService;

  constructor(appState: AppStateService) {
    this.appState = appState;

    this.inputForm = new InputFormComponent(this.appState);
  }

  update(): void {
    this.list.innerHTML = '';
    this.appState.savesMap.forEach((value, name) => {
      const item = createSaveItem(name, this.appState);
      this.list.appendChild(item);

      const isSelected =
        item.dataset.name && item.dataset.name === this.appState.getCurrentSaveName();

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
