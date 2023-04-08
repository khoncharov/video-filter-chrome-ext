import { MAX_SAVE_NAME_LENGTH } from '../../constants';
import SaveDataService from '../../services/data';
import FilterStateService from '../../services/filter';
import createSaveItem from './save-item';

export default class SaveDialogComponent {
  private data: SaveDataService;

  private filter: FilterStateService;

  private input = document.querySelector('#input-save-name') as HTMLInputElement;

  private addBtn = document.querySelector('#btn-add-name') as HTMLButtonElement;

  private list = document.querySelector('#list-saves') as HTMLUListElement;

  constructor(filter: FilterStateService, data: SaveDataService) {
    this.filter = filter;
    this.data = data;

    this.input.addEventListener('input', () => {
      const value = this.input.value.slice(0, MAX_SAVE_NAME_LENGTH);
      this.input.value = value;
      this.updateBtn();
    });

    this.input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.addBtn.click();
      }
    });

    this.addBtn.addEventListener('click', () => {
      const saveName = this.input.value.trim();
      this.data.saveItem(saveName, this.filter.getState());
      this.input.value = '';

      this.updateBtn();
    });

    this.data.addEventListener('dataChanged', () => {
      const state = this.data.getState(this.data.currentSaveName);
      if (state) {
        this.filter.restoreState(state);
      }

      this.updateList();
    });
  }

  updateList(): void {
    this.list.innerHTML = '';
    this.data.forEach((value, name) => {
      this.list.appendChild(createSaveItem(name, this.data));
    });
  }

  updateBtn(): void {
    if (this.input.value.trim().length > 0) {
      this.addBtn.classList.add('btn-add-enabled');
      this.addBtn.disabled = false;
    } else {
      this.addBtn.classList.remove('btn-add-enabled');
      this.addBtn.disabled = true;
    }
  }
}
