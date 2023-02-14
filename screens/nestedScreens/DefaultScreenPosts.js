import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot } from "firebase/firestore";
const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setPosts((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.urlPhoto }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Button
                title='go to map'
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title='go to Comments'
                onPress={() => navigation.navigate("Comments", {})}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default DefaultScreenPosts;
