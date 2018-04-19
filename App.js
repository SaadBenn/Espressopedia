import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Location, Permissions } from 'expo';
import Map from './src/components/Map';
import YelpService from './services/yelp';

// hardcoded deltas
let deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class App extends Component {
  state = {
    region: null,
    coffeShops: [],
  };

  componentWillMount() {
    this.getLocationAsync();
  }
  
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
    
    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
    await this.getCoffeeShops();
  }

  getCoffeeShops = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const coffeeShops = await YelpService.getCoffeeShops(userLocation);
    this.setState({ coffeeShops });
  };

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
