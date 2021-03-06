import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MusicItems from './MusicItems';

import MUSICITEMS from '../../fixtures/musicItems';

describe('MusicItems', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  function renderMusicItems({ music = [], musicItemsTitle = '' }) {
    return render(
      <MusicItems
        musicItemsTitle={musicItemsTitle}
        music={music}
        onClick={handleClick}
      />,
    );
  }

  it('renders category title', () => {
    const musicItemsTitle = '어쿠스틱';

    const { container } = renderMusicItems({ musicItemsTitle });

    expect(container).toHaveTextContent(musicItemsTitle);
  });

  it('renders music items', () => {
    const music = MUSICITEMS;

    const { container, getByText } = renderMusicItems({ music });

    music.forEach(({
      snippet: {
        title, channelTitle, description, thumbnails,
      },
    }) => {
      expect(container).toHaveTextContent(title);
      expect(container).toHaveTextContent(channelTitle);
      expect(container).toHaveTextContent(channelTitle);
      expect(getByText(description)).toHaveStyle(`background: url(${thumbnails.default.url}) no-repeat`);
    });
  });

  it('listens onClick event', () => {
    const music = MUSICITEMS;

    const { getByText } = renderMusicItems({ music });

    music.forEach((selectedMusic) => {
      const { snippet: { title, channelTitle, description } } = selectedMusic;

      fireEvent.click(getByText(title));
      fireEvent.click(getByText(channelTitle));
      fireEvent.click(getByText(description));

      expect(handleClick).toBeCalledWith(selectedMusic, music);
    });
  });
});
