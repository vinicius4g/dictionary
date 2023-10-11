import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Theme from '@styles/theme/Theme';

import Routes from '@routes/Routes';

import WordsProvider from '@contexts/words';
import AuthProvider from '@contexts/auth';

import { initializeStorage } from '@storage/storageService';
import { mmkvStorage } from '@storage/mmkvStorage';

import { initializeSetupTrackPlayer } from '@utils/initializePlayer';

const queryClient = new QueryClient();
initializeStorage(mmkvStorage);

initializeSetupTrackPlayer();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AuthProvider>
            <WordsProvider>
              <Theme>
                <Routes />
              </Theme>
            </WordsProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
