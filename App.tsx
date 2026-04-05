import React from 'react';
import { StatusBar } from 'react-native';

import { AppNavigator } from './src/app/navigation/app-navigator';
import { AppProviders } from './src/app/providers/app-providers';
import { colors } from './src/shared/theme/colors';

function App() {
  return (
    <AppProviders>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <AppNavigator />
    </AppProviders>
  );
}

export default App;
