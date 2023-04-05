/* eslint-disable implicit-arrow-linebreak */

const detectBtn = document.querySelector('#detect-btn') as HTMLButtonElement;

function showContainer() {
  const videoContainer = document.querySelector<HTMLVideoElement>('video');

  if (videoContainer) {
    videoContainer.style.filter = 'invert(1)';

    setTimeout(() => {
      if (videoContainer) {
        videoContainer.style.filter = '';
      }
    }, 1000);
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

detectBtn.addEventListener('click', detectHandler);

const defaultBtn = document.querySelector('#default-btn') as HTMLButtonElement;
const brightBtn = document.querySelector('#bright-btn') as HTMLButtonElement;

function changeVideo(brightness: number, contrast: number, saturate: number): void {
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
      func: changeVideo,
      args: [brightness, contrast, saturate],
    });
  }
}

brightBtn.addEventListener('click', () => {
  brightnessHandler(240, 108, 85);
});

defaultBtn.addEventListener('click', () => {
  brightnessHandler(100, 100, 100);
});
