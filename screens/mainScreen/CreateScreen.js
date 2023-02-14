import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [urlPhoto, setUrlPhoto] = useState(null);
  const { userId, nickname } = useSelector((state) => state.auth);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();

    // const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
  };

  const uploadPostToServer = async () => {
    await uploadPhotoToServer();

    const data = {
      urlPhoto,
      comment,
      location: location.coords,
      nickname,
      userId,
    };

    await addDoc(collection(db, "posts"), data);
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const response = await fetch(photo);
    const file = await response.blob();
    const uniCode = Date.now().toString();
    const storageRef = ref(storage, `postImages/${uniCode}`);
    await uploadBytes(storageRef, file);

    await getDownloadURL(ref(storage, `postImages/${uniCode}`))
      .then((url) => {
        setUrlPhoto(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");

    setComment("");
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200, borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>

      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setComment}
            value={comment}
          />
        </View>
        <TouchableOpacity
          onPress={sendPhoto}
          style={styles.sendBtn}
          disabled={!photo}
        >
          <Text style={styles.sendLabel}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "70%",
    marginHorizontal: 2,
    marginTop: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  input: {
    height: 50,
    borderBottomColor: "#20b2aa",
    borderColor: "transparent",
    borderWidth: 1,
    marginTop: 20,
  },
  inputContainer: { marginHorizontal: 10 },
});

export default CreateScreen;
