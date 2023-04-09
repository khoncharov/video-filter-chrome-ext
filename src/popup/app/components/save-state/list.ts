import SaveDataService from '../../services/data';
import createSaveItem from './save-item';

export default class ListComponent {
  private list = document.querySelector('#list-saves') as HTMLUListElement;

  private data: SaveDataService;

  constructor(data: SaveDataService) {
    this.data = data;
  }

  update(): void {
    this.list.innerHTML = '';
    this.data.forEach((value, name) => {
      this.list.appendChild(createSaveItem(name, this.data));
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
