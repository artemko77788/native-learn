import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = { email: "", password: "" };

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 40 * 2
  );

  useEffect(() => {
    const widthMonitor = () => {
      setDimensions(Dimensions.get("window").width - 50 * 2);
    };

    const dimensionsHandler = Dimensions.addEventListener(
      "change",
      widthMonitor
    );
    return () => dimensionsHandler.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const hideKeyboardOnTouchScreen = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboardOnTouchScreen}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/image/low-angle-shot-mesmerizing-starry-sky.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={{ ...styles.headerTitle, fontFamily: "Kani" }}>
                  Hello again
                </Text>
                <Text style={{ ...styles.headerTitle, fontFamily: "Itim" }}>
                  Welcome
                </Text>
              </View>

              <View>
                <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  onFocus={() => setIsShowKeyboard(true)}
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                  value={state.password}
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style='auto' />
      </View>
    </TouchableWithoutFeedback>
  );
}
<script src='http://localhost:8097'></script>;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",

    alignItems: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 40,
    borderRadius: 6,
    color: "#f0f8ff",
  },

  form: {
    // marginHorizontal: 40
  },
  inputTitle: { color: "#f0f8ff", marginTop: 10, fontSize: 18 },
  btn: {
    height: 40,
    borderRadius: 6,
    marginTop: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
    backgroundColor: Platform.OS === "ios" ? "transparent" : `#1e90ff`,
    borderColor: Platform.OS === "ios" && "#f0f8ff",

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: `#1e90ff`,
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    fontSize: 18,

    ...Platform.select({
      ios: {
        color: `#1e90ff`,
      },
      android: { color: "#f0f8ff" },
    }),
  },
  header: {
    alignItems: "center",
    marginBottom: 150,
  },
  headerTitle: {
    color: "#f0f8ff",
    fontSize: 30,
  },
});
