import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Navigation from './src/components/Navigation';
import { AuthContext, AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor='#06bcee'/>
      <Navigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
