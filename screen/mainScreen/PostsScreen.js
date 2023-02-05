import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log(posts);

  return (
    <View style={s.container}>
      <FlatList
        style={{ marginTop: 50 }}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, borderRadius: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ marginHorizontal: 10, height: 300, borderRadius: 10 }}
            />
          </View>
        )}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default PostsScreen;
