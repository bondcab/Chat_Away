// useState and useEffect from React
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import MapView from "react-native-maps";

// UI Components from React Native
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";

// Offline storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Gifted chat library for creating chat UI
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

//Custom Actions component
import CustomActions from "./CustomActions";

// Chat Component
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  // name and colour passed from start screen
  const { name, color, userID } = route.params;
  // Array to store message history
  const [messages, setMessages] = useState([]);
  // Function to handle sending messages. Appends the chat history UI with past messages and newly sent message
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Changes the chat bubbles background colours
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const CustomInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.input} />;
  };

  // Changed input toolbar
  const renderInputToolbar = (props) => {
    if (isConnected === true) return <CustomInputToolbar {...props} />;
    else return null;
  };

  // Add messages to local storage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  let unsubMessages;

  // Once component is mounted the message history is set
  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  // Once component is mounted users name is displayed at top of UI from prop given from start screen imput element
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Temp functions
  function pickImage() {
    console.log("pickImage");
  }

  // Renders MapView if currentMessage contains location data
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  // The chat JSX component returned for user to see
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        minInputToolbarHeight={100}
        user={{
          _id: userID,
          name,
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/chat-away-6a66a.appspot.com/o/profile_pictures%2Favatar_01.jpeg?alt=media&token=7896334f-96a9-4af6-846e-a987fde1c5c0",
        }}
      />

      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="position" />
      ) : null}
    </View>
  );
};

// Styles for chat UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatHeading: {
    color: "white",
    fontSize: 50,
  },
  input: {
    minHeight: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
