import { StyleSheet, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <>
        <SafeAreaView style={styles.unsafe} />
        <View  style={styles.container}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </View >
      </>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  unsafe: {
    flex: 0,
    backgroundColor: '#000000'
  }
});
