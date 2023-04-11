/* eslint-disable object-curly-newline */
import { FilterState } from './services/types';

function showVideoRect() {
  const container = document.querySelector<HTMLVideoElement>('video');

  if (container) {
    container.style.border = '1rem dashed magenta';

    const BORDER_TIMEOUT = 500;
    setTimeout(() => {
      if (container) {
        container.style.border = 'none';
      }
    }, BORDER_TIMEOUT);
  }
}

export async function showRectHandler() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  if (tab.id && tab.url?.startsWith('http')) {
    const { id } = tab;

    chrome.scripting.executeScript({
      target: { tabId: id },
      func: showVideoRect,
    });
  }
}

function changeFilter(
  brightness: number,
  contrast: number,
  saturation: number,
  isFlipped: boolean,
): void {
  const container = document.querySelector<HTMLVideoElement>('video');

  if (container) {
    const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    container.style.filter = filterStr;

    const transformStr = `scaleX(${isFlipped ? '-1' : '1'})`;
    container.style.transform = transformStr;
  }
}

export async function changeFilterHandler(filter: FilterState): Promise<void> {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  if (tab.id && tab.url?.startsWith('http')) {
    const { id } = tab;
    const { brightness, contrast, saturation, isFlipped } = filter;

    chrome.scripting.executeScript({
      target: { tabId: id },
      func: changeFilter,
      args: [brightness, contrast, saturation, isFlipped],
    });
  }
}
