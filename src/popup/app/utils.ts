/* eslint-disable object-curly-newline */

import { FilterState } from './types';

function showVideoRect() {
  const container = document.querySelector<HTMLVideoElement>('video');

  if (container) {
    container.style.border = '5px dashed magenta';

    setTimeout(() => {
      if (container) {
        container.style.border = 'none';
      }
    }, 500);
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

  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  const transformStr = `scaleX(${isFlipped ? '-1' : '1'})`;

  if (container) {
    container.style.filter = filterStr;
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
