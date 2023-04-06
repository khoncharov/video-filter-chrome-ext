/* eslint-disable implicit-arrow-linebreak */
import { fromEvent, throttleTime } from 'rxjs';

const detectBtn = document.querySelector('#detect-btn') as HTMLButtonElement;

function showContainer() {
  const videoContainer = document.querySelector<HTMLVideoElement>('video');

  if (videoContainer) {
    videoContainer.style.border = '5px dashed magenta'; // CONST

    setTimeout(() => {
      if (videoContainer) {
        videoContainer.style.border = 'none';
      }
    }, 500);
  }
}

async function detectHandler() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  if (tab.id) {
    const { id } = tab;

    chrome.scripting.executeScript({
      target: { tabId: id },
      func: showContainer,
    });
  }
}

fromEvent(detectBtn, 'click').pipe(throttleTime(1000)).subscribe(detectHandler);

const defaultBtn = document.querySelector('#default-btn') as HTMLButtonElement;
const applyBtn = document.querySelector('#bright-btn') as HTMLButtonElement;

function changeFilter(brightness: number, contrast: number, saturate: number): void {
  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
  const videoContainer = document.querySelector<HTMLVideoElement>('video');

  if (videoContainer) {
    videoContainer.style.filter = filterStr;
  }
}

async function brightnessHandler(
  brightness: number,
  contrast: number,
  saturate: number,
): Promise<void> {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  if (tab.id) {
    const { id } = tab;

    chrome.scripting.executeScript({
      target: { tabId: id },
      func: changeFilter,
      args: [brightness, contrast, saturate],
    });
  }
}

fromEvent(applyBtn, 'click')
  .pipe(throttleTime(50))
  .subscribe(() => {
    brightnessHandler(240, 108, 85);
  });

fromEvent(defaultBtn, 'click')
  .pipe(throttleTime(50))
  .subscribe(() => {
    brightnessHandler(100, 100, 100);
  });
