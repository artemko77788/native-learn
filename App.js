import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { UseRouter } from "./router";

export default function App() {
  const routing = UseRouter(true);

  const [fontsLoaded] = useFonts({
    Kani: require("./assets/fonts/Kanit-Italic.ttf"),
    Itim: require("./assets/fonts/Itim-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return <NavigationContainer>{routing}</NavigationContainer>;
}
