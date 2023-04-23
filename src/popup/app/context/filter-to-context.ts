/* eslint-disable object-curly-newline */
import { FilterState } from '../services/types';
import { getActiveTabId } from './tab-utils';

export function changeFilter(
  brightness: number,
  contrast: number,
  saturation: number,
  isFlipped: boolean,
): void {
  const container = document.querySelector<HTMLVideoElement>('video');

  if (container) {
    const value = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    container.style.filter = value;
    container.style.transform = `scaleX(${isFlipped ? '-1' : '1'})`;
  }
}

export async function applyFilterToContext(filter: FilterState): Promise<void> {
  const id = await getActiveTabId();

  if (id !== null) {
    const { brightness, contrast, saturation, isFlipped } = filter;

    chrome.scripting.executeScript({
      target: { tabId: id },
      func: changeFilter,
      args: [brightness, contrast, saturation, isFlipped],
    });
  }
}
