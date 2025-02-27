import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const ForgotPassword = ({ navigation }: any) => { 
  const [email, setEmail] = useState("");

  const handleSendOTP = async () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      // Replace with actual API endpoint
      const response = await axios.post("https://yourapi.com/send-otp", { email });

      if (response.data.success) {
        Alert.alert("OTP Sent", "Please check your email for the OTP.");
        navigation.navigate("VerifyOTP", { email }); // Navigate to OTP Verification screen
      } else {
        Alert.alert("Error", response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />  
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Please enter your email to request a password reset.</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Send OTP Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff"},
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    height: 40, 
    marginBottom: 20,
    backgroundColor: "#1F3F7F",
  },
  backButton: {
    color: "white",
    fontSize: 24,
    marginLeft: 10,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#123884", marginBottom: 3, marginTop: 10,marginLeft:10},
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20,marginLeft:10 },
  input: { height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 15,marginLeft:10,marginRight:10},
  button: { backgroundColor: "#123884", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 50,marginLeft:10,marginRight:10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ForgotPassword;
