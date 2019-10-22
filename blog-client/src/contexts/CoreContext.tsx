import * as React from 'react';

const { createContext, Component } = React;
export type AuthMode = 'REGISTER' | 'LOGIN'
type CoreState = {
  layer: boolean;
  auth: {
    visible: boolean;
    mode: AuthMode;
  };
};

type CoreActions = {
  setLayer(value: boolean): void;
  showAuthModal(type: AuthMode): void;
  changeAuthModalMode(type: AuthMode): void;
  closeAuthModal(): void;
};

type CoreValue = {
  state: CoreState;
  actions: CoreActions;
};

const initialState  = {
  auth: {
    visible: false,
    mode: 'REGISTER' as AuthMode,
  },
  layer: false,
}
const CoreContext = createContext<CoreValue>({
  state: initialState,
  
  actions: {
    setLayer: () => {},
    showAuthModal: () => {},
    changeAuthModalMode:(type) => {},
    closeAuthModal: () =>{},
  },
});

class CoreProvider extends Component<{}, CoreState> {
  state = initialState;

  actions: CoreActions = {
    setLayer: (value: boolean) => {
      this.setState({
        layer: value,
      });
    },
    showAuthModal: (type: AuthMode) => {
      this.setState({
        layer: true,
        auth: {
          ...this.state.auth,
          visible: true,
          mode: type,
        },
      });
    },
    changeAuthModalMode:mode => {
      this.setState({
        auth: {
          ...this.state.auth,
          mode,
        }
      })
    },
    closeAuthModal: () => {
      this.setState({
        auth: {
          ...this.state.auth,
          visible: false,
        },
        layer: false,
      });
    }
  };

  render() {
    return (
      <CoreContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
        {this.props.children}
      </CoreContext.Provider>
    );
  }
}

export { CoreProvider };
export default CoreContext;