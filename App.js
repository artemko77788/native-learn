import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import Main from "./components/Main";
import { store } from "./redux/store";

export default function App() {
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
    <Provider store={store}>
      <Main onLayoutRootView={onLayoutRootView} />
    </Provider>
  );
}
