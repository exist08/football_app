import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './src/AppNavigator';
// Import your other providers
// import { ToastProvider } from './providers/ToastProvider';
// import { ThemeProvider } from './providers/ThemeProvider';
// import { rootStore } from './store';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <BottomSheetModalProvider> */}
        <SafeAreaProvider>
          {/* <Provider store={rootStore}> */}
            {/* <ToastProvider> */}
              {/* <ThemeProvider> */}
                <AppNavigator />
              {/* </ThemeProvider> */}
            {/* </ToastProvider> */}
          {/* </Provider> */}
        </SafeAreaProvider>
      {/* </BottomSheetModalProvider> */}
    </GestureHandlerRootView>
  );
}