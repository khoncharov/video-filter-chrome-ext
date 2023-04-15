import SaveDataService from '../../services/data';
import createSaveItem from './save-item';

export default class ListComponent {
  private list = document.querySelector('ul#list-saves') as HTMLUListElement;

  private data: SaveDataService;

  constructor(data: SaveDataService) {
    this.data = data;
  }

  update(): void {
    this.list.innerHTML = '';
    this.data.savesStorage.forEach((value, name) => {
      const item = createSaveItem(name, this.data);
      this.list.appendChild(item);
      item.scrollIntoView({ behavior: 'smooth' });
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
