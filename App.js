import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import LoginScreen from "./screen/auth/LoginScreen";
import RegisterScreen from "./screen/auth/RegisterScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Kani: require("./assets/fonts/Kanit-Italic.ttf"),
    Itim: require("./assets/fonts/Itim-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      {/* <LoginScreen onLayout={onLayout} /> */}
      <RegisterScreen nLayout={onLayout} />
    </>
  );
}
