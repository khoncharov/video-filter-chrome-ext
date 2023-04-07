import FilterStateService from '../services/filter';
import ResetBtnComponent from './btn-reset';
import FlipVideoComponent from './flip';
import BrightnessRangeComponent from './range-brightness';
import ContrastRangeComponent from './range-contrast';
import SaturationRangeComponent from './range-saturation';

export default class FilterDialogComponent {
  private filter: FilterStateService;

  // private rangeBrightness: BrightnessRangeComponent;

  // private rangeContrast: ContrastRangeComponent;

  // private rangeSaturation: SaturationRangeComponent;

  private checkboxFlipVideo: FlipVideoComponent;

  private btnReset: ResetBtnComponent;

  constructor(filter: FilterStateService) {
    this.filter = filter;

    // this.rangeBrightness = new BrightnessRangeComponent(this.filter);
    // this.rangeContrast = new ContrastRangeComponent(this.filter);
    // this.rangeSaturation = new SaturationRangeComponent(this.filter);
    this.checkboxFlipVideo = new FlipVideoComponent(this.filter);

    this.btnReset = new ResetBtnComponent(this.filter);

    this.filter.addEventListener('filterChanged', () => {
      this.update();
    });
  }

  update(): void {
    // this.rangeBrightness.update();
    // this.rangeContrast.update();
    // this.rangeSaturation.update();

    this.checkboxFlipVideo.update();
  }
}
