import React { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Location, Permissions } from 'expo';
import Map from './src/js/components/Map';

// hardcoded location just for testing the app
let deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class App extends Component {
  state = {
    region: null
    coffeShops: []
  };

  componentWillMount() {
    const location = this.getLocationAsync();
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  }

  async function getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      throw new Error('Location permission not granted');
    }
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
