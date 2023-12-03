import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  function handleColorPick1() {
    setColor("#090C08");
  }

  function handleColorPick2() {
    setColor("#474056");
  }

  function handleColorPick3() {
    setColor("#8A95A5");
  }

  function handleColorPick4() {
    setColor("#B9C6AE");
  }

  console.log(color);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./BackgroundImage.png")}
        style={styles.image}
      >
        <Text style={styles.title}>Chat Away</Text>
        <View style={styles.lowerContainer}>
          <View style={styles.inputContainer}>
            {/* <Image source={require("./icon.svg")} style={styles.icon}></Image> */}
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>

          <Text style={styles.colorText}>Choose Background Color</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={styles.color_01}
              onPress={handleColorPick1}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.color_02}
              onPress={handleColorPick2}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.color_03}
              onPress={handleColorPick3}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.color_04}
              onPress={handleColorPick4}
            ></TouchableOpacity>
          </View>

          <TouchableOpacity
            title="Start Chatting"
            onPress={() =>
              navigation.navigate("Chat", { name: name, color: color })
            }
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
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    marginTop: 100,
    fontWeight: "bold",
    marginBottom: 240,
    color: "#FFFFFF",
  },
  textInput: {
    fontSize: 16,
    color: "#757083",
    fontWeight: 300,
  },
  button: {
    backgroundColor: "#757083",
    width: "88%",
    height: "16%",
    justifyContent: "center",
    alignItems: "center",
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
  },
  color_01: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  color_02: {
    backgroundColor: "#474056",
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  color_03: {
    backgroundColor: "#8A95A5",
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  color_04: {
    backgroundColor: "#B9C6AE",
    width: 50,
    height: 50,
    borderRadius: "50%",
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
  },
  lowerContainer: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "88%",
    height: "44%",
  },
  inputContainer: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#757083",
  },
  icon: {
    height: 19,
    width: 20,
  },
});

export default Start;
