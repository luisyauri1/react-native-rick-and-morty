import React, { type PropsWithChildren, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createAppQueryClient } from './create-app-query-client';

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(createAppQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </QueryClientProvider>
  );
}
