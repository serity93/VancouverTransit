import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import RNLocation from 'react-native-location';
import MapView from 'react-native-maps';

const App = () => {
  const VANCOUVER_LATITUDE = 49.28273;
  const VANCOUVER_LONGITUDE = -123.120735;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (9.0 / 20.0);

  const permissionOptions = {
    ios: 'whenInUse',
    android: {
      detail: 'fine',
    },
  };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: VANCOUVER_LATITUDE,
    longitude: VANCOUVER_LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  let unsubscribeToLocationUpdates = useRef(() => {});

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });
  }, []);

  useEffect(() => {
    RNLocation.checkPermission(permissionOptions).then((hasPermission) => {
      if (hasPermission) {
        unsubscribeToLocationUpdates.current = RNLocation.subscribeToLocationUpdates(
          (locations) => {
            setCurrentLocation(locations[0]);
          },
        );
      } else {
        RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'fine',
          },
        }).then((granted) => {
          if (granted) {
            unsubscribeToLocationUpdates.current = RNLocation.subscribeToLocationUpdates(
              (locations) => {
                setCurrentLocation(locations[0]);
              },
            );
          } else {
            Alert.alert('Error', 'App requires location permission!', [
              { text: 'Ok' },
            ]);
          }
        });
      }
    });

    return () => unsubscribeToLocationUpdates.current();
  }, [permissionOptions]);

  useEffect(() => {
    if (currentLocation) {
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      }));
    }
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{region.latitude}</Text>
        <Text style={styles.text}>{region.longitude}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
