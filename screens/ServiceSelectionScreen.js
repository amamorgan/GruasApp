import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function ServiceSelectionScreen() {

  const navigation = useNavigation();

  const [selectedService, setSelectedService] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const [drivers, setDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  // 📍 Obtener ubicación real
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          setLoadingLocation(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

      } catch (error) {
        setErrorMsg('Error obteniendo ubicación');
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  // 🌐 API Externa - Obtener conductores simulados
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        console.log("Conductores simulados:", data);

        // Simular coordenadas cercanas
        const simulatedDrivers = data.slice(0, 5).map((driver, index) => ({
          id: driver.id,
          name: driver.name,
          latitude: 8.9824 + (Math.random() - 0.5) * 0.02,
          longitude: -79.5199 + (Math.random() - 0.5) * 0.02,
        }));

        setDrivers(simulatedDrivers);

      } catch (error) {
        console.log("Error API:", error);
      } finally {
        setLoadingDrivers(false);
      }
    };

    fetchDrivers();
  }, []);

  const services = [
    { id: '1', name: 'Grúa de Plataforma', price: 35 },
    { id: '2', name: 'Asistencia de Batería', price: 20 },
    { id: '3', name: 'Cambio de Llanta', price: 18 },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.serviceButton,
        selectedService?.id === item.id && styles.selected,
      ]}
      onPress={() => setSelectedService(item)}
    >
      <Text>{item.name} - ${item.price}</Text>
    </TouchableOpacity>
  );

  const handleContinue = () => {
    if (!selectedService) return;
    navigation.navigate('Tracking', {
      service: selectedService,
      userLocation: location?.coords
    });
  };

  if (loadingLocation || loadingDrivers) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5a623" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location?.coords.latitude || 8.9824,
          longitude: location?.coords.longitude || -79.5199,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
      >

        {/* 📍 Usuario */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Tu ubicación"
          />
        )}

        {/* 🚛 Conductores simulados */}
        {drivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.latitude,
              longitude: driver.longitude,
            }}
            title={driver.name}
            pinColor="orange"
          />
        ))}

      </MapView>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Selecciona un Servicio</Text>

        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        {selectedService && (
          <Text style={styles.estimate}>
            Estimado: ${selectedService.price} | 15-25 min
          </Text>
        )}

        <TouchableOpacity style={styles.continue} onPress={handleContinue}>
          <Text style={{ color: 'white' }}>Solicitar Servicio</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 350,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 5,
  },
  selected: {
    backgroundColor: '#f5a623',
  },
  estimate: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  continue: {
    marginTop: 10,
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
