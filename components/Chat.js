// useState and useEffect from React
import { useState, useEffect } from "react";

// UI Components from React Native
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  renderBubble,
} from "react-native";

// Gifted chat library for creating chat UI
import { GiftedChat, Bubble } from "react-native-gifted-chat";

// Chat Component
const Chat = ({ route, navigation }) => {
  // name and colour passed from start screen
  const { name, color } = route.params;
  // Array to store message history
  const [messages, setMessages] = useState([]);
  // Function to handle sending messages. Appends the chat history UI with past messages and newly sent message
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
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
          _id: 1,
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
