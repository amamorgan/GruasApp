import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function PaymentScreen() {
  const route = useRoute();
  const { service } = route.params;
  const [method, setMethod] = useState(null);

  const methods = ['Yappy', 'Clave', 'Tarjeta'];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Resumen</Text>
      <Text>Servicio: {service.name}</Text>
      <Text>Total: ${service.price}</Text>

      <Text style={{ marginTop: 20 }}>Método de Pago</Text>

      {methods.map((m, i) => (
        <TouchableOpacity
          key={i}
          style={{
            padding: 12,
            backgroundColor: method === m ? '#f5a623' : '#eee',
            marginVertical: 5,
            borderRadius: 10,
          }}
          onPress={() => setMethod(m)}
        >
          <Text>{m}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: '#f5a623',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Confirmar Pago</Text>
      </TouchableOpacity>
    </View>
  );
}
