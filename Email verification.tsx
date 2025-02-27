import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const VerifyOTP = ({ route }) => {
  const navigation = useNavigation<any>();
  const email = route?.params?.email || ""; // Fix applied
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("https://yourapi.com/verify-otp", { email, otp });

      if (response.data.success) {
        Alert.alert("Success", "OTP verified successfully!");
        navigation.navigate("ResetPassword", { email });
      } else {
        Alert.alert("Error", response.data.message || "Invalid OTP.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>An OTP has been sent to {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#003366", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  input: { height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 15 },
  button: { backgroundColor: "#003366", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default VerifyOTP;
