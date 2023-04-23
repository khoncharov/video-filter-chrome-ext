import appState from '../../services/app-state';
import FlipVideoComponent from './flip';
import RangeComponent from './range';

export default class FilterComponent {
  private saveNameCaption = document.querySelector('span#save-name-caption') as HTMLSpanElement;

  private rangeBrightness: RangeComponent;

  private rangeContrast: RangeComponent;

  private rangeSaturation: RangeComponent;

  private flipVideo: FlipVideoComponent;

  constructor() {
    this.rangeBrightness = new RangeComponent('brightness');
    this.rangeContrast = new RangeComponent('contrast');
    this.rangeSaturation = new RangeComponent('saturation');
    this.flipVideo = new FlipVideoComponent();

    const btnReset = document.querySelector('button#btn-reset') as HTMLButtonElement;
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

  updateCaption(): void {
    this.saveNameCaption.textContent = appState.getCurrentSaveName()
      ? ` - ${appState.getCurrentSaveName()}`
      : '';
  }
}
