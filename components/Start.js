import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const backgroundColors = {
  black: "#090C08",
  purple: "#474056",
  grey: "#8A95A5",
  green: "#B9C6AE",
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "" };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/background-image.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.test}>
            <Text style={styles.title}>Chat App</Text>
          </View>
          <View style={styles.details}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your Name'
            />
            <View style={styles.colorPicker}>
              <Text style={styles.chooseBackground}>
                Choose Background Colour:
              </Text>
              <View style={styles.colorGroup}>
                <TouchableOpacity
                  style={[
                    { backgroundColor: backgroundColors.black },
                    styles.color,
                    this.state.color === backgroundColors.black
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.black })
                  }
                ></TouchableOpacity>

                <TouchableOpacity
                  style={[
                    { backgroundColor: backgroundColors.purple },
                    styles.color,
                    this.state.color === backgroundColors.purple
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.purple })
                  }
                ></TouchableOpacity>

                <TouchableOpacity
                  style={[
                    { backgroundColor: backgroundColors.grey },
                    styles.color,
                    this.state.color === backgroundColors.grey
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.grey })
                  }
                ></TouchableOpacity>

                <TouchableOpacity
                  style={[
                    { backgroundColor: backgroundColors.green },
                    styles.color,
                    this.state.color === backgroundColors.green
                      ? styles.colorSelected
                      : {},
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.green })
                  }
                ></TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  color: this.state.color,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: "88%",
    height: "40%",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    bottom: 20,
  },
  input: {
    height: 55,
    borderColor: "gray",
    borderWidth: 2,
    width: "88%",
    // opacity: "50%",
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
    alignContent: "center",
  },
  button: {
    height: 55,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#757083",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  chooseBackground: {
    fontSize: 17,
    fontWeight: "400",
    color: "#757083",
    // opacity: "100%",
  },
  color: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 20,
    marginTop: 15,
  },
  colorPicker: {
    width: "88%",
  },
  colorGroup: {
    flexDirection: "row",
  },
  colorSelected: {
    borderColor: "#7f7399",
    borderWidth: 2,
  },
  test: {
    flex: 50,
    alignContent: "center",
    top: 120,
  },
});
