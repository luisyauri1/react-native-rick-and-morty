import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0b1220" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>The Rick and Morty API</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1220',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#d8ff72',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default App;
