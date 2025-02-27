import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OTPVerificationScreen from "./screens/Otp";
import LoginScreen from "./screens/Login";
import OrphanageSignUp from "./screens/Signup ";
import ForgotPassword from "./screens/forgot";
import SetNewPasswordScreen from "./screens/Setpassword";
import OrphanageMenuManagement from "./screens/food";
import ProfileInfo from "./screens/profile";
import Dashboard from "./screens/dashboard";
import DonationManagementScreen from "./screens/donation management";
import FoodRedistribution from "./screens/Notification";
import VerifyOTP from "./screens/Email verification";
import SavedMenuScreen from "./screens/savedmenu";

const Stack = createStackNavigator();

const Start = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="signup" component={OrphanageSignUp} />
      <Stack.Screen name="Forgotpassword" component={ForgotPassword} />
      <Stack.Screen
        name="OTPVerificationScreen "
        component={OTPVerificationScreen}
      />
      <Stack.Screen name="setpassword" component={SetNewPasswordScreen} />
      <Stack.Screen name="Emailverification" component={VerifyOTP} />
      <Stack.Screen name="profile" component={ProfileInfo} />
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen
        name="donationmanagement"
        component={DonationManagementScreen}
      />
      <Stack.Screen name="foodredistribution" component={FoodRedistribution} />
      <Stack.Screen
        name="Orphanagemenumanagement"
        component={OrphanageMenuManagement}
      />
      <Stack.Screen name="Savedmenu" component={SavedMenuScreen} />
    </Stack.Navigator>
  );
};

export default Start;
