import { DEFAULT_VALUE } from '../../constants';
import SaveDataService from '../../services/data';

type RangeName = 'brightness' | 'contrast' | 'saturation';

export default class RangeComponent {
  private rangeName: RangeName;

  private data: SaveDataService;

  private textValue: HTMLParagraphElement;

  private range: HTMLInputElement;

  constructor(rangeName: RangeName, data: SaveDataService) {
    this.rangeName = rangeName;
    this.data = data;

    const element = document.querySelector(`div#component-${rangeName}`) as HTMLElement;
    this.textValue = element.querySelector('p.ctrl__value') as HTMLParagraphElement;
    this.range = element.querySelector('input') as HTMLInputElement;
    const resetBtn = element.querySelector('button') as HTMLButtonElement;

    this.update();

    this.range.addEventListener('input', () => {
      this.data[`${rangeName}`] = Number(this.range.value);
      this.update();
    });

    resetBtn.addEventListener('click', () => {
      this.reset();
    });
  }

  update() {
    this.range.value = this.data[`${this.rangeName}`].toString();
    this.textValue.textContent = this.range.value;
  }

  reset() {
    this.data[`${this.rangeName}`] = DEFAULT_VALUE[`${this.rangeName}`];
    this.update();
  }
}
