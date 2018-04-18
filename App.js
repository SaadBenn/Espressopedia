import React { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Location, Permissions } from 'expo';
import Map from './src/js/components/Map';
import YelpService from './services/yelp';

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

  async function getCoffeeShops() {
    const {latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const coffeeShops = await YelpService.getCoffeeShops(userLocation);
    this.setState({ coffeeShops });
  };

  async function getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      throw new Error('Location permission not granted');
    }
    await this.getCoffeeShops();
  }

  render() {
    const { region, coffeeShops } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Map
          region={region}
          places={coffeeShops} />
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
