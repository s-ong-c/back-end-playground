import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import SongcPageTemplate, {
  SongcPageTemplateProps,
} from '../SongcPageTemplate';
import renderWithRedux from '../../../lib/renderWithRedux';

describe('SongcPageTemplate', () => {
  const setup = (props: Partial<SongcPageTemplateProps> = {}) => {
    const initialProps: SongcPageTemplateProps = {};
    const utils = renderWithRedux(
      <MemoryRouter>
        <SongcPageTemplate {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('renders Header', () => {
    const { getByTestId } = setup();
    getByTestId('Header');
  });
});
