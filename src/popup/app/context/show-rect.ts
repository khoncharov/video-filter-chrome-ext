import { getActiveTabId } from './tab-utils';

export function showVideoRect() {
  const container = document.querySelector<HTMLVideoElement>('video');

  if (container) {
    container.style.border = '1rem dashed magenta';

    const BORDER_TIMEOUT = 1000;
    setTimeout(() => {
      if (container) {
        container.style.border = 'none';
      }
    }, BORDER_TIMEOUT);
  }
}

export async function showRectHandler() {
  const id = await getActiveTabId();

  if (id !== null) {
    chrome.scripting.executeScript({
      target: { tabId: id },
      func: showVideoRect,
    });
  }
}
