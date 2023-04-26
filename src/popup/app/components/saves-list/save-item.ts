/* eslint-disable no-param-reassign */
import { deleteBtnSVG } from '../../layout';
import AppStateService from '../../services/app-state';

export default function createSaveItem(name: string, appState: AppStateService): HTMLElement {
  const item = document.createElement('li');
  item.className = 'save__item';
  item.dataset.name = name;

  item.innerHTML = `
    <label class="save__label">
      <input class="input-radio" type="radio" name="loaded-item"/>
      <span class="radio">
        <span class="radio-mark"></span>
      </span>
      <span class="save__caption"></span>
    </label>
    <button class="btn-delete" type="button" aria-label="Delete save: ${name}" tabindex="5">${deleteBtnSVG}</button>`;

  (item.querySelector('span.save__caption') as HTMLSpanElement).textContent = name;

  const radio = item.querySelector('input') as HTMLInputElement;
  radio.checked = appState.getCurrentSaveName() === name;

  const focusHandler = () => {
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  radio.addEventListener('focus', focusHandler);

  const selectItemHandler = () => {
    appState.restore(name);
  };
  item.querySelector('input')?.addEventListener('click', selectItemHandler);

  const deleteBtnHandler = () => {
    appState.delete(name);
    item.removeEventListener('click', selectItemHandler);
    item.removeEventListener('focus', focusHandler);
    item.removeEventListener('click', deleteBtnHandler);
    item.remove();
  };
  item.querySelector('button')?.addEventListener('click', deleteBtnHandler);

  return item;
}
