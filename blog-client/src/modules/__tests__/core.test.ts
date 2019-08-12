import * as core from '../core';

const reducer = core.default;

describe('core reducer', () => {
  const getInitialState = () => reducer(undefined, {});
  it('should return the initial state', () => {
    const state = getInitialState();
    expect(state).toEqual({
      layer: false,
      auth: { visible: false, mode: 'LOGIN' },
    });
  });

  describe('action handlers', () => {
    it('SET_LAYER', () => {
      let state = getInitialState();

      state = reducer(state, core.setLayer(true));
      expect(state.layer).toBe(true);

      state = reducer(state, core.setLayer(false));
      expect(state.layer).toBe(false);
    });

    it('SHOW_AUTH_MODAL', () => {
      let state = getInitialState();

      state = reducer(state, core.showAuthModal('LOGIN'));

      expect(state.auth).toEqual({
        ...getInitialState().auth,
        mode: 'LOGIN',
        visible: true,
      });
      expect(state.layer).toBe(true);

      state = reducer(state, core.showAuthModal('REGISTER'));
      expect(state.auth.mode).toEqual('REGISTER');
    });

    it('CHANGE_AUTH_MODAL_MODE', () => {
      let state = getInitialState();

      state = reducer(state, core.changeAuthModalMode('LOGIN'));
      expect(state.auth.mode).toBe('LOGIN');

      state = reducer(state, core.changeAuthModalMode('REGISTER'));
      expect(state.auth.mode).toBe('REGISTER');
    });

    it('CLOSE_AUTH_MODAL', () => {
      let state = getInitialState();
      state = reducer(state, core.showAuthModal('LOGIN'));
      state = reducer(state, core.closeAuthModal());
      expect(state.auth.visible).toBe(false);
      expect(state.layer).toBe(false);
    });
  });
});
