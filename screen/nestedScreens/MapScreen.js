import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flax: 1,
  },
});
