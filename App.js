import { NavigationContainer } from '@react-navigation/native';
import StackNav from "./src/navigation/stack";
import { MusicPlayerProvider } from './src/views/MusicPlayerContext';

export default function App() {
  return (
    <MusicPlayerProvider>
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  </MusicPlayerProvider>
  );
}