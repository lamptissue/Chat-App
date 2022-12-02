import React from "react";
import { View, Platform, Button, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  // Messages for the 'Bot' to start the chat and system message
  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hello ${name}`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "Your chat has started",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: color,
        }}
      >
        <Button
          title='Go to Start'
          onPress={() => this.props.navigation.navigate("Start")}
        />

        {/* Chat component */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
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

// <TouchableOpacity
//   accessible={true}
//   accessibilityLabel="More options"
//   accessibilityHint="Lets you choose to send an image or your geolocation."
//   accessibilityRole="button"
//   onPress={this._onPress}>
//   <View style={styles.button}>
//    ...
//   </View>
// </TouchableOpacity>
