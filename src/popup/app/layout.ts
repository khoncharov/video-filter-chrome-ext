export const deleteBtnSVG = `
<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
  <path d="M9.10156 7.64844C9.45703 7.97656 9.45703 8.55078 9.10156 8.87891C8.9375 9.04297 8.71875 9.125 8.5 9.125C8.25391 9.125 8.03516 9.04297 7.87109 8.87891L5 6.00781L2.10156 8.87891C1.9375 9.04297 1.71875 9.125 1.5 9.125C1.25391 9.125 1.03516 9.04297 0.871094 8.87891C0.515625 8.55078 0.515625 7.97656 0.871094 7.64844L3.74219 4.75L0.871094 1.87891C0.515625 1.55078 0.515625 0.976562 0.871094 0.648438C1.19922 0.292969 1.77344 0.292969 2.10156 0.648438L5 3.51953L7.87109 0.648438C8.19922 0.292969 8.77344 0.292969 9.10156 0.648438C9.45703 0.976562 9.45703 1.55078 9.10156 1.87891L6.23047 4.77734L9.10156 7.64844Z"
    fill="white"/>
</svg>`;

const layout = `
<h1 class="v-hidden">Video filter</h1>
<article class="article">
  <h2 class="v-hidden">Target page controls</h2>
  <div class="head__wrapper">
    <button class="btn btn-header btn-apply" id="apply-btn" type="button">apply</button>
    <button class="btn btn-header" id="show-rect-btn" type="button">show</button>
  </div>
</article>
<article class="article">
  <h2 class="article-title">Filter<span id="save-name-caption"></span></h2>
  <div class="ctrl__container" id="component-brightness">
    <div class="ctrl__header">
      <p class="ctrl__caption">Brightness</p>
      <p class="ctrl__value"></p>
      <button class="btn-delete" type="button" aria-label="Reset brightness value">${deleteBtnSVG}</button>
    </div>
    <div class="range-container">
      <span class="track-background"></span>
      <span class="track-bar"></span>
      <input class="range" type="range" max="400" min="0" step="1" aria-label="Brightness" />
    </div>
  </div>
  <div class="ctrl__container" id="component-contrast">
    <div class="ctrl__header">
      <p class="ctrl__caption">Contrast</p>
      <p class="ctrl__value"></p>
      <button class="btn-delete" type="button" aria-label="Reset contrast value">${deleteBtnSVG}</button>
    </div>
    <div class="range-container">
      <span class="track-background"></span>
      <span class="track-bar"></span>
      <input class="range" type="range" max="200" min="0" step="1" aria-label="Contrast" />
    </div>
  </div>
  <div class="ctrl__container" id="component-saturation">
    <div class="ctrl__header">
      <p class="ctrl__caption">Saturation</p>
      <p class="ctrl__value"></p>
      <button class="btn-delete" type="button" aria-label="Reset saturation value">${deleteBtnSVG}</button>
    </div>
    <div class="range-container">
      <span class="track-background"></span>
      <span class="track-bar"></span>
      <input class="range" type="range" max="200" min="0" step="1" aria-label="Saturation" />
    </div>
  </div>
  <div class="ctrl__footer">
    <label class="checkbox-flip-label">
      <input id="input-flip" type="checkbox" />
      <span class="checkbox">
        <span class="checkbox-mark"></span>
      </span>
      <span class="checkbox-flip-caption">
        Flip
        <svg width="17" height="9" viewBox="0 0 17 9" fill="none" aria-label="horizontally">
          <path d="M15.707 5.04895L12.8945 7.86145C12.7188 8.03723 12.4844 8.12512 12.25 8.12512C11.9863 8.12512 11.752 8.03723 11.5762 7.86145C11.1953 7.50989 11.1953 6.89465 11.5762 6.54309L12.7773 5.31262H4.19336L5.39453 6.54309C5.77539 6.89465 5.77539 7.50989 5.39453 7.86145C5.21875 8.03723 4.98438 8.12512 4.75 8.12512C4.48633 8.12512 4.25195 8.03723 4.07617 7.86145L1.26367 5.04895C0.882812 4.69739 0.882812 4.08215 1.26367 3.73059L4.07617 0.918091C4.42773 0.537231 5.04297 0.537231 5.39453 0.918091C5.77539 1.26965 5.77539 1.88489 5.39453 2.23645L4.19336 3.43762H12.7773L11.5762 2.23645C11.1953 1.88489 11.1953 1.26965 11.5762 0.918091C11.9277 0.537231 12.543 0.537231 12.8945 0.918091L15.707 3.73059C16.0879 4.08215 16.0879 4.69739 15.707 5.04895Z"
            fill="#4E1A3D"/>
        </svg>
      </span>
    </label>
    <button class="btn btn-reset" id="btn-reset">Reset</button>
  </div>
</article>
<article class="article">
  <h2 class="article-title">Saves</h2>
  <label class="label-new-name" for="input-save-name">Name</label>
  <div class="input-new-name__wrapper">
    <input class="input-new-name" id="input-save-name" type="text" />
    <button class="btn" id="btn-add-name" disabled>Add</button>
  </div>
  <fieldset>
    <legend class="v-hidden">Saved setups</legend>
    <ul class="save__list" id="list-saves"></ul>
  </fieldset>
</article>`;

// eslint-disable-next-line import/prefer-default-export
export function updateLayout(): void {
  const main = document.querySelector('#main') as HTMLDivElement;
  main.innerHTML = layout;

  setTimeout(() => {
    main.classList.add('main-visible');
  }, 50);
}
