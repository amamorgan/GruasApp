import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    await signOut(auth);
    //navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="tow-truck"
            size={40}
            color="#f5a623"
            />
         <Text style={styles.title}>GruasApp</Text>
        </View>
      <Text style={styles.subtitle}>Solicita asistencia en minutos</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ServiceSelection')}
      >
        <Text style={styles.buttonText}>Solicitar Servicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logout]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: '#666',
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginLeft: 10,
    },
  button: {
    backgroundColor: '#f5a623',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  logout: {
    backgroundColor: '#a4250f',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
