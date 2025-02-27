import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Start from "./start";
import SetNewPasswordScreen from "./screens/Setpassword";
import DashboardScreen from "./screens/dashboard";
import ProfileInfo from "./screens/profile";
import OrphanageMenu from "./screens/food";
import SavedMenuScreen from "./screens/savedmenu";
import OrphanageMenuManagement from "./screens/food";
import DonationManagementScreen from "./screens/donation management";
import FoodRedistribution from "./screens/Notification";
import Dashboard from "./screens/dashboard";
import LoginScreen from "./screens/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <FoodRedistribution/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
