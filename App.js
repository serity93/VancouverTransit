import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

const App = () => {
  const VANCOUVER_LATITUDE = 49.28273;
  const VANCOUVER_LONGITUDE = -123.120735;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (9.0 / 20.0);

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: VANCOUVER_LATITUDE,
        longitude: VANCOUVER_LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;
