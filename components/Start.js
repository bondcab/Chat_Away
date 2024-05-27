import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
} from "react-native";

const Start = ({ navigation }) => {
  // Name variable to be passed to and displayed at top of chat UI
  const [name, setName] = useState("");
  // Variable for colour user selects from options that chat background UI will be changed to
  const [color, setColor] = useState("");
  const [keyboardActive, setKeyboardActive] = useState(false);

  // Authentication
  const auth = getAuth();

  function handleOnFocus() {
    if (Platform.OS === "ios") {
      setKeyboardActive(true);
    }
  }

  function handleOnBlur() {
    if (Platform.OS === "ios") {
      setKeyboardActive(false);
    }
  }

  // Sign in Anonymously function
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };
  // Sets color to #090C08 if user selects button with this onPress function
  function handleColorPick1() {
    setColor("#090C08");
  }

  // Sets color to #474056 if user selects button with this onPress function
  function handleColorPick2() {
    setColor("#474056");
  }

  // Sets color to #8A95A5 if user selects button with this onPress function
  function handleColorPick3() {
    setColor("#8A95A5");
  }

  // Sets color to #B9C6AE if user selects button with this onPress function
  function handleColorPick4() {
    setColor("#B9C6AE");
  }

  // The start screen JSX component returned for user to see
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./BackgroundImage.png")}
        style={styles.image}
      >
        <Text style={styles.title}>Chat Away</Text>
        <View
          style={[
            styles.lowerContainer,
            {
              alignSelf: keyboardActive ? "center" : "flex-end",
            },
            {
              transform: [{ translateY: keyboardActive ? -150 : -50 }],
            },
          ]}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
            />
          </View>
          <Text style={styles.colorText}>Choose Background Color</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[
                styles.color_01,
                { borderColor: color == "#090C08" ? "#44a6c6" : "white" },
                { borderWidth: color == "#090C08" ? 5 : 0 },
              ]}
              onPress={handleColorPick1}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.color_02,
                { borderColor: color == "#474056" ? "#44a6c6" : "white" },
                { borderWidth: color == "#474056" ? 5 : 0 },
              ]}
              onPress={handleColorPick2}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.color_03,
                { borderColor: color == "#8A95A5" ? "#44a6c6" : "white" },
                { borderWidth: color == "#8A95A5" ? 5 : 0 },
              ]}
              onPress={handleColorPick3}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.color_04,
                { borderColor: color == "#B9C6AE" ? "#44a6c6" : "white" },
                { borderWidth: color == "#B9C6AE" ? 5 : 0 },
              ]}
              onPress={handleColorPick4}
            ></TouchableOpacity>
          </View>

          <TouchableOpacity
            title="Start Chatting"
            accessible={true}
            accessibilityLabel="More options"
            accessibilityHint="Lets you choose to send an image or your geolocation."
            accessibilityRole="button"
            onPress={signInUser}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    marginTop: 100,
    fontWeight: "800",
    marginBottom: 240,
    color: "#FFFFFF",
    transform: [{ translateY: -135 }],
  },
  textInput: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#757083",
    width: "88%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    flexDirection: "row",
  },
  color_01: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
  },
  color_02: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
  },
  color_03: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
  },
  color_04: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
  },
  colorContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  colorText: {
    marginTop: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  lowerContainer: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "88%",
    borderRadius: 20,
    position: "absolute",
    paddingBottom: 50,
    paddingTop: 40,
  },
  inputContainer: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#757083",
    borderRadius: 15,
  },
  icon: {
    height: 19,
    width: 20,
  },
});

export default Start;
