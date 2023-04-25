import { changeFilter } from './filter-to-context';

describe('Test changeFilter function', () => {
  const brightness = 123;
  const contrast = 456;
  const saturation = 789;

  test('Should provide correct filter and flip setup', () => {
    const vid = document.createElement('video');
    document.body.append(vid);

    changeFilter(brightness, contrast, saturation, true);

    expect(vid.style.filter).toEqual(
      `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    );
    expect(vid.style.transform).toEqual('scaleX(-1)');

    changeFilter(brightness, contrast, saturation, false);

    expect(vid.style.transform).toEqual('scaleX(1)');
  });
});
