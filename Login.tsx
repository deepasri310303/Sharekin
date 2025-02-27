import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
//import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }: any) => {
  const [orphanageName, setOrphanageName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (orphanageName === '' || email === '' || password === '') {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Dummy authentication
    if (email === 'admin@sharekin.com' && password === 'password123') {
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Invalid Credentials', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>Sharekin</Text>
      </View>
      {/* Login Title */}
      <Text style={styles.title}>Welcome to Sharekin{'\n'}Login Now</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Orphanage Name"
        value={orphanageName}
        onChangeText={setOrphanageName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },

  /* Header Styles */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15,
    height: 40, 
    marginBottom: 20, // Space below the header
    backgroundColor: '#1F3F7F',
  },
  logo: { width: 40, height: 40, marginRight: 10 },
  backButton: {
    color: 'white', // Customize back button color
    fontSize: 24,
    marginRight: 10,
    marginLeft: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'white', 
    fontSize: 20,
  },

  /* Text & Title */
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'left',padding:5, marginBottom:15,marginTop:10, color: '#123884' },

  /* Input Fields */
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20, backgroundColor: 'white' },

  /* Password Container */
  passwordContainer: { flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, alignItems: 'center', backgroundColor: 'white' },
  passwordInput: { flex: 1 },

  /* Forgot Password */
  forgotText: { color: '#2194FF', textAlign: 'right', marginTop: 5 },

  /* Buttons */
  loginButton: { backgroundColor: '#123884', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 40 },
  loginText: { color: 'white', fontSize: 16 },

  orText: { textAlign: 'center', marginVertical: 10, marginTop:30},

  signUpButton: { backgroundColor: '#eee', padding: 15, borderRadius: 8, alignItems: 'center',marginTop:20},
  signUpText: { color: '#002D72', fontSize: 16 }
});

export default LoginScreen;
