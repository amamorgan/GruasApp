import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebaseConfig";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            setErrorMessage("Por favor completa todos los campos");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");

            await signInWithEmailAndPassword(auth, email, password);

            // No navegamos manualmente.
            // onAuthStateChanged manejará el cambio de pantalla.

        } catch (error) {

            let message = "Error al iniciar sesión";

            switch (error.code) {
                case "auth/invalid-credential":
                    message = "Correo o contraseña incorrectos";
                    break;
                case "auth/user-not-found":
                    message = "Usuario no registrado";
                    break;
                case "auth/wrong-password":
                    message = "Contraseña incorrecta";
                    break;
                case "auth/invalid-email":
                    message = "Correo inválido";
                    break;
            }

            setErrorMessage(message);

        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {

        if (!email || !password) {
            setErrorMessage("Por favor completa todos los campos");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");

            await createUserWithEmailAndPassword(auth, email, password);

        } catch (error) {
            setErrorMessage("No se pudo crear el usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>

                <View style={styles.titleContainer}>
                    <MaterialCommunityIcons
                    name="tow-truck"
                    size={40}
                    color="#f5a623"
                    />
                    <Text style={styles.title}>GruasApp</Text>
                </View>

                <Text style={styles.subtitle}>Bienvenido</Text>

                {errorMessage !== "" && (
                    <Text style={styles.errorText}>
                        {errorMessage}
                    </Text>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.7 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>
                            Iniciar Sesión
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.buttonText}>
                        Registrarse
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
        color: "#666",
        marginBottom: 30,
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
    errorText: {
        color: "red",
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "600",
    },
    input: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        backgroundColor: "#f5a623",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonSecondary: {
        backgroundColor: "#4CAF50",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
