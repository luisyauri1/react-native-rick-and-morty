import React, { type PropsWithChildren, useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createAppQueryClient } from './create-app-query-client';
import { setupReactQueryReactNative } from './setup-react-query-react-native';

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(createAppQueryClient);

  useEffect(() => {
    return setupReactQueryReactNative();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </QueryClientProvider>
  );
}
