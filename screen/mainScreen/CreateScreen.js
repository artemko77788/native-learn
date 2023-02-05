import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

import * as Location from "expo-location";

const CreateScreen = ({ navigation }) => {
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await snap.takePictureAsync();

    let location = await Location.getCurrentPositionAsync({});

    setPhoto(photo.uri);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
  };

  return (
    <View style={s.container}>
      <Camera style={s.camera} ref={setSnap}>
        {photo && (
          <View style={s.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 150, borderRadius: 10 }}
            />
          </View>
        )}

        <TouchableOpacity onPress={takePhoto} style={s.btnContainer}>
          <Text style={s.btnsnap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity
        onPress={sendPhoto}
        style={s.sendContainer}
        disabled={!photo}
      >
        <Text style={s.btnsnap}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "80%",
    marginHorizontal: 10,
    marginTop: 50,
    borderRadius: 10,
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: `#0000ff`,
    width: 70,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: `#a52a2a`,
  },
  btnsnap: {
    color: `#0000ff`,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  sendContainer: {
    marginHorizontal: 30,
    height: 50,
    borderWidth: 2,
    btnContainer: `#0000ff`,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateScreen;
