import { MAX_SAVE_NAME_LENGTH } from '../../constants';
import SaveDataService from '../../services/data';

export default class InputFormComponent {
  private nameInput = document.querySelector('input#input-save-name') as HTMLInputElement;

  private addBtn = document.querySelector('button#btn-add-name') as HTMLButtonElement;

  constructor(data: SaveDataService) {
    this.nameInput.addEventListener('input', () => {
      const value = this.nameInput.value.slice(0, MAX_SAVE_NAME_LENGTH);
      this.nameInput.value = value;
      this.update();
    });

    this.nameInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.addBtn.click();
      }
    });

    this.addBtn.addEventListener('click', () => {
      const saveName = this.nameInput.value.trim();
      data.saveState(saveName);
      this.nameInput.value = '';

      this.update();
    });
  }

  update(): void {
    if (this.nameInput.value.trim().length > 0) {
      this.addBtn.classList.add('btn-add-enabled');
      this.addBtn.disabled = false;
    } else {
      this.addBtn.classList.remove('btn-add-enabled');
      this.addBtn.disabled = true;
    }
  }
}
