import FilterStateService from '../../services/filter';
import { FilterState, SaveName } from '../../types';

export default function createSaveItem(
  name: string,
  filter: FilterStateService,
  data: Map<SaveName, FilterState>,
): HTMLElement {
  const item = document.createElement('li');
  item.className = 'save__item';

  item.innerHTML = `      
    <label class="save__label">
      <input class="input-radio" type="radio" name="loaded-item" checked/>
      <div class="radio">
        <div class="radio-mark"></div>
      </div>
      <span class="save__caption" id="save-caption">${name}</span>
    </label>
    <button class="btn-delete" type="button" aria-label="Delete value">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path
          d="M9.10156 7.64844C9.45703 7.97656 9.45703 8.55078 9.10156 8.87891C8.9375 9.04297 8.71875 9.125 8.5 9.125C8.25391 9.125 8.03516 9.04297 7.87109 8.87891L5 6.00781L2.10156 8.87891C1.9375 9.04297 1.71875 9.125 1.5 9.125C1.25391 9.125 1.03516 9.04297 0.871094 8.87891C0.515625 8.55078 0.515625 7.97656 0.871094 7.64844L3.74219 4.75L0.871094 1.87891C0.515625 1.55078 0.515625 0.976562 0.871094 0.648438C1.19922 0.292969 1.77344 0.292969 2.10156 0.648438L5 3.51953L7.87109 0.648438C8.19922 0.292969 8.77344 0.292969 9.10156 0.648438C9.45703 0.976562 9.45703 1.55078 9.10156 1.87891L6.23047 4.77734L9.10156 7.64844Z"
          fill="white"
        />
      </svg>
    </button>`;

  item.querySelector('input')?.addEventListener('click', () => {
    const state = data.get(name);
    if (state) {
      filter.restoreState(state);
    }
  });

  item.querySelector('button')?.addEventListener('click', () => {
    data.delete(name);
    item.remove();
  });

  return item;
}
