import { DEFAULT_VALUE } from '../../constants';
import filterData from '../../services/filter-data';

type RangeName = 'brightness' | 'contrast' | 'saturation';

export default class RangeComponent {
  private rangeName: RangeName;

  private textValue: HTMLParagraphElement;

  private range: HTMLInputElement;

  constructor(rangeName: RangeName) {
    this.rangeName = rangeName;

    const element = document.querySelector(`div#component-${rangeName}`) as HTMLElement;
    this.textValue = element.querySelector('p.ctrl__value') as HTMLParagraphElement;
    this.range = element.querySelector('input') as HTMLInputElement;
    const resetBtn = element.querySelector('button') as HTMLButtonElement;

    this.update();

    this.range.addEventListener('input', () => {
      filterData[`${rangeName}`] = Number(this.range.value);
      this.update();
    });

    resetBtn.addEventListener('click', () => {
      this.reset();
    });
  }

  update() {
    this.range.value = filterData[`${this.rangeName}`].toString();
    this.textValue.textContent = this.range.value;
  }

  reset() {
    filterData[`${this.rangeName}`] = DEFAULT_VALUE[`${this.rangeName}`];
    this.update();
  }
}
