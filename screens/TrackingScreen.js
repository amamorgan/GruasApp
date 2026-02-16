import React from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function TrackingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 8.99,
          longitude: -79.52,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: 8.99, longitude: -79.52 }} />
      </MapView>

      <View style={{ padding: 20, backgroundColor: 'white' }}>
        <Text>Servicio: {service.name}</Text>
        <Text>Conductor: Carlos Gómez</Text>
        <Text>ETA: 12 minutos</Text>
        <Text>Distancia: 5.4 km</Text>

        <Button title="Llamar" onPress={() => {}} />
        <Button title="Ir a Pagar" onPress={() => navigation.navigate('Payment', { service })} />
      </View>
    </View>
  );
}
