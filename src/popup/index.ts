import './style.scss';
import { fromEvent, throttleTime } from 'rxjs';

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

async function showBtnHandler() {
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

function bootstrap() {
  const showBtn = document.querySelector('#show-rect-btn') as HTMLButtonElement;
  const defaultBtn = document.querySelector('#default-btn') as HTMLButtonElement;
  const applyBtn = document.querySelector('#apply-btn') as HTMLButtonElement;

  fromEvent(showBtn, 'click').pipe(throttleTime(600)).subscribe(showBtnHandler);

  fromEvent(defaultBtn, 'click')
    .pipe(throttleTime(50))
    .subscribe(() => {
      brightnessHandler(100, 100, 100);
    });

  fromEvent(applyBtn, 'click')
    .pipe(throttleTime(50))
    .subscribe(() => {
      brightnessHandler(240, 108, 85);
    });
}

bootstrap();
