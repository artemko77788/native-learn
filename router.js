import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screen/auth/LoginScreen";
import RegisterScreen from "./screen/auth/RegisterScreen";
import PostsScreen from "./screen/mainScreen/PostsScreen";
import CreateScreen from "./screen/mainScreen/CreateScreen";
import ProfileScreen from "./screen/mainScreen/ProfileScreen";

import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Auth = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const UseRouter = (isAuth) => {
  if (!isAuth) {
    return (
      <Auth.Navigator>
        <Auth.Screen
          options={{ headerShown: false }}
          name='LOGIN'
          component={LoginScreen}
        />
        <Auth.Screen
          name='REGISTER'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Auth.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <MainTab.Screen
        name='Posts'
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name='local-post-office' size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name='Create'
        component={CreateScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='plus-circle' size={35} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name='face-man-profile'
              size={size}
              color={color}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
