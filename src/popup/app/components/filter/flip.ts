import { DEFAULT_VALUE } from '../../constants';
import SaveDataService from '../../services/data';

export default class FlipVideoComponent {
  private data: SaveDataService;

  private element: HTMLInputElement;

  constructor(data: SaveDataService) {
    this.data = data;

    this.element = document.querySelector('#input-flip') as HTMLInputElement;

    this.element.checked = this.data.isFlipped;

    this.element.addEventListener('change', () => {
      this.data.isFlipped = this.element.checked;
    });
  }

  update(): void {
    this.element.checked = this.data.isFlipped;
  }

  reset(): void {
    this.data.isFlipped = DEFAULT_VALUE.isFlipped;
    this.update();
  }
}
