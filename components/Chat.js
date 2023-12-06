// useState and useEffect from React
import { useState, useEffect, useId } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";

// UI Components from React Native
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";

// Gifted chat library for creating chat UI
import { GiftedChat, Bubble } from "react-native-gifted-chat";

// Chat Component
const Chat = ({ route, navigation, db }) => {
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

  // Once component is mounted the message history is set
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  // Once component is mounted users name is displayed at top of UI from prop given from start screen imput element
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // The chat JSX component returned for user to see
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
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
});

export default Chat;
