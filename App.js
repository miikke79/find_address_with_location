import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button, Alert} from 'react-native';
import MapView, { Marker } from'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !=='granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLongitude(location.coords.longitude);
    setLatitude(location.coords.latitude);
  })();  
  }, []);

  const fetchLocation = () => 
  {  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=K6UsLI0CHckInWVQwxQaQrdANObKx3hL&location=${address}`)  
  .then(response => response.json())  
  .then(data => {setLatitude(data.results[0].locations[0].latLng.lat), setLongitude(data.results[0].locations[0].latLng.lng) })
  .catch(error => {         Alert.alert('Error', error);   });
} 

  return (

    <View style={styles.container}>
      <MapView
        style={styles.map}   
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}>
        <Marker
        coordinate={{
          latitude:latitude, 
          longitude:longitude}}
          />
        </MapView>
      <TextInput
      style={{fontSize: 18}}
        placeholder='enter address'
        onChangeText={text => setAddress(text)}
      />
      <View style={styles.button}>
      <Button 
    title='Show'
    onPress={fetchLocation}
    />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch'
  },
  map: {
    flex:1,
    width: "100%",
    height: "100%"
  }
});
