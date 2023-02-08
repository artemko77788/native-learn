import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { onAuthStateChanged } from "firebase/auth";

import auth from "./firebase/config";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const routing = useRoute(user);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      const uid = user.uid;
    } else {
    }
  });

  const [fontsLoaded] = useFonts({
    Kanit: require("./assets/fonts/Kanit-Italic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store} onLayoutRootView={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
