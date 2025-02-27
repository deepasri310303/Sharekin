import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const verifyOTP = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP');
      return;
    }

    try {
      const response = await axios.post('https://your-api.com/verify-otp', { otp: otpCode });
      if (response.data.success) {
        Alert.alert('Success', 'OTP Verified!');
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP');
    }
  };

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const resendOTP = () => {
    setTimer(30);
    Alert.alert('OTP Resent', 'Check your phone for a new OTP');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />  
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OTP</Text>
      </View>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter verification code</Text>
      
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={verifyOTP}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Ionicons name="chatbubble-ellipses-outline" size={18} color="#123884" style={styles.messageIcon} />
        {timer > 0 ? (
          <Text style={styles.resendText}>Resend in {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={resendOTP}>
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#EEF2FF' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#123884', marginLeft: 10 },
  subtitle: { fontSize: 16, color: '#555', marginLeft: 10 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  otpInput: { width: 50, height: 50, borderWidth: 1, borderColor: '#999', textAlign: 'center', fontSize: 20, marginHorizontal: 5, borderRadius: 5 },
  verifyButton: { backgroundColor: '#1E3A8A', padding: 15, borderRadius: 8, marginTop: 20 },
  verifyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  resendContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'flex-end' },
  resendText: { color: '#979797', marginLeft: 5 },
  resendLink: { color: '#123884', fontWeight: 'bold', marginLeft: 5 },
  messageIcon: { marginRight: 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    height: 40, 
    marginBottom: 20,
    backgroundColor: '#1F3F7F',
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
    marginLeft: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

export default OTPVerificationScreen;
