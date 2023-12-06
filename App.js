import { StyleSheet } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
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

// {(props) => <Chat db={db} {...props} />}
