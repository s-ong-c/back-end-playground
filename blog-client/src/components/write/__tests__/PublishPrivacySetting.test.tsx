import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishPrivacySettings, {
  PublishPrivacySettingsProps,
} from '../PublishPrivacySettings';

describe('PublishPrivacySettings', () => {
  const setup = (props: Partial<PublishPrivacySettingsProps> = {}) => {
    const initialProps: PublishPrivacySettingsProps = {
      isPrivate: false,
      onSelect: () => {},
    };
    const utils = render(
      <PublishPrivacySettings {...initialProps} {...props} />,
    );
    const buttons = {
      public: utils.getByText('전체 공개'),
      private: utils.getByText('나만 보기'),
    };
    return {
      ...utils,
      buttons,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  describe('shows active style', () => {
    it('PUBLIC', () => {
      const utils = setup();
      expect(getComputedStyle(utils.buttons.public).color).toBe(
        'rgb(32, 201, 151)',
      );
    });
    it('PRIVATE', () => {
      const utils = setup({ isPrivate: true });
      expect(getComputedStyle(utils.buttons.private).color).toBe(
        'rgb(32, 201, 151)',
      );
    });
  });
  it('call onSelect fucntion onClick', () => {
    const onSelect = jest.fn();
    const utils = setup({ onSelect });
    fireEvent.click(utils.buttons.private);
    expect(onSelect).toBeCalledWith(true);
    fireEvent.click(utils.buttons.public);
    expect(onSelect).toBeCalledWith(false);
  });
});
