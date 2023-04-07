import { MAX_SAVE_NAME_LENGTH } from '../../constants';
import FilterStateService from '../../services/filter';
import { FilterState, SaveName } from '../../types';
import createSaveItem from './save-item';

export default class SaveDialogComponent {
  private filter: FilterStateService;

  private input = document.querySelector('#input-save-name') as HTMLInputElement;

  private btn = document.querySelector('#btn-add-name') as HTMLButtonElement;

  private list = document.querySelector('#list-saves') as HTMLUListElement;

  private data: Map<SaveName, FilterState>;

  private name: SaveName = '';

  constructor(filter: FilterStateService) {
    this.filter = filter;

    this.input.addEventListener('input', () => {
      this.name = this.input.value.slice(0, MAX_SAVE_NAME_LENGTH);
      this.input.value = this.name;
      this.updateBtn();
    });

    this.data = new Map<SaveName, FilterState>();

    this.btn.addEventListener('click', () => {
      const saveName = this.input.value;
      this.data.set(saveName, this.filter.getState());
      this.input.value = '';

      this.list.innerHTML = '';
      this.data.forEach((value, name) => {
        this.list.appendChild(createSaveItem(name, this.filter, this.data));
      });

      this.updateBtn();
    });
  }

  updateBtn(): void {
    if (this.input.value.trim().length > 0) {
      this.btn.classList.add('btn-add-enabled');
      this.btn.disabled = false;
    } else {
      this.btn.classList.remove('btn-add-enabled');
      this.btn.disabled = true;
    }
  }
}
