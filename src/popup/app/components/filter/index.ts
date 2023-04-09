import FlipVideoComponent from './flip';
import RangeComponent from './range';
import SaveDataService from '../../services/data';

export default class FilterComponent {
  private rangeBrightness: RangeComponent;

  private rangeContrast: RangeComponent;

  private rangeSaturation: RangeComponent;

  private flipVideo: FlipVideoComponent;

  private data: SaveDataService;

  constructor(data: SaveDataService) {
    this.data = data;

    this.rangeBrightness = new RangeComponent('brightness', this.data);
    this.rangeContrast = new RangeComponent('contrast', this.data);
    this.rangeSaturation = new RangeComponent('saturation', this.data);
    this.flipVideo = new FlipVideoComponent(this.data);

    const btnReset = document.querySelector('#btn-reset') as HTMLButtonElement;
    btnReset.addEventListener('click', () => {
      this.rangeBrightness.reset();
      this.rangeContrast.reset();
      this.rangeSaturation.reset();
      this.flipVideo.reset();
    });
  }

  updateView(): void {
    this.rangeBrightness.update();
    this.rangeContrast.update();
    this.rangeSaturation.update();
    this.flipVideo.update();
  }
}
