import { StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={s.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
