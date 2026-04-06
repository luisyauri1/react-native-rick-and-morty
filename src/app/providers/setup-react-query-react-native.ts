import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

export function setupReactQueryReactNative() {
  const appStateSubscription = AppState.addEventListener('change', status => {
    focusManager.setFocused(status === 'active');
  });

  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(Boolean(state.isConnected));
    });
  });

  return () => {
    appStateSubscription.remove();
  };
}
