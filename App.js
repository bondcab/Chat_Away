import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBYD8mk17lffTuDQ5OfZ-Tqt2K6O9jzbuU",
    authDomain: "chat-away-6a66a.firebaseapp.com",
    projectId: "chat-away-6a66a",
    storageBucket: "chat-away-6a66a.appspot.com",
    messagingSenderId: "796696100032",
    appId: "1:796696100032:web:302ac2c550c5e8398b8125",
    measurementId: "G-RRH9VF2GSP",
  };

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
