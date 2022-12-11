import React from "react";
import { View, Platform, Button, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        avatar: "",
        name: "",
      },
    };

    const firebaseConfig = {
      apiKey: "AIzaSyDpNOktB7_TssqGW4RqE0RFxo7jIE8K6Ks",
      authDomain: "chatapp-83d3c.firebaseapp.com",
      projectId: "chatapp-83d3c",
      storageBucket: "chatapp-83d3c.appspot.com",
      messagingSenderId: "39966289943",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  componentDidMount() {
    this.getMessages();
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.unsubscribe = this.referenceChatMessages.onSnapshot(
      this.onCollectionUpdate
    );

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
        console.log("online");
      } else {
        this.setState({
          isConnected: false,
        });
        console.log("offline");
      }
    });
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || "",
        },
      });
    });
    this.setState({
      messages,
    });
  };

  addMessage = () => {
    const messages = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: messages._id,
      text: messages.text,
      createdAt: messages.createdAt,
      user: messages.user,
      uid: this.state.uid,
      text: messages.text || "",
    });
  };
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  onSend = (messages = []) => {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  };

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.saveMessages();
      }
    );
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //styling for the chat bubbles - user side
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#F2D2BD",
          },
        }}
      />
    );
  }
  render() {
    let color = this.props.route.params.color;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color,
        }}
      >
        {/* <Button
          title='Go to Start'
          onPress={() => this.props.navigation.navigate("Start")}
        /> */}

        {/* Chat component */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            avatar: "https://placeimg.com/140/140/any",
          }}
        />
        {/* Allows keyboard to work correctly in the app */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}
