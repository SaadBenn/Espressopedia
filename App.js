import React { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import Map from './src/js/components/Map';

// hardcoded location just for testing the app
let region = {
  latitude: 37.321996988,
  longitude: -122.0325472123455,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default class App extends Component {
  state = {
    region: null
    coffeShops: []
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={region}
          places={this.state.coffeeShops} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
