import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  const routing = useRoute(true);

  const [fontsLoaded] = useFonts({
    "DMMono-Regular": require("./assets/fonts/Kanit-Italic.ttf"),
    Itim: require("./assets/fonts/Itim-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return <NavigationContainer>{routing}</NavigationContainer>;
}
