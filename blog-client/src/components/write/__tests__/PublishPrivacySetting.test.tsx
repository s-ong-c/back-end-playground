import * as React from 'react';
import { render } from 'react-testing-library';
import PublishPrivacySettings, {
  PublishPrivacySettingsProps,
  PrivacySetting,
} from '../PublishPrivacySettings';

describe('PublishPrivacySettings', () => {
  const setup = (props: Partial<PublishPrivacySettingsProps> = {}) => {
    const initialProps: PublishPrivacySettingsProps = {
      selected: PrivacySetting.PUBLIC,
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
      const utils = setup({ selected: PrivacySetting.PRIVATE });
      expect(getComputedStyle(utils.buttons.private).color).toBe(
        'rgb(32, 201, 151)',
      );
    });
  });
  // it('call onSelect fucntion onClick')
});
