import { MAX_SAVE_NAME_LENGTH } from '../../constants';
import SaveDataService from '../../services/data';
import createSaveItem from './save-item';

export default class SaveStateComponent {
  private data: SaveDataService;

  private input = document.querySelector('#input-save-name') as HTMLInputElement;

  private addBtn = document.querySelector('#btn-add-name') as HTMLButtonElement;

  private list = document.querySelector('#list-saves') as HTMLUListElement;

  // extract 2 components: list and form

  constructor(data: SaveDataService) {
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
      this.data.saveItem(saveName);
      this.input.value = '';

      this.updateBtn();
    });
  }

  updateList(): void {
    this.list.innerHTML = '';
    this.data.forEach((value, name) => {
      this.list.appendChild(createSaveItem(name, this.data));
    });
  }

  clearSelectedItem(): void {
    this.list.querySelectorAll('input').forEach((input) => {
      if (input.checked) {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      }
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
