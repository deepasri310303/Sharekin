import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//import {Ionicons} from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

const SetNewPasswordScreen = ({ navigation }: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const handleSave = () => {
    if (password === confirmPassword && password.length >= 6) {
      navigation.navigate('SuccessScreen');  // Navigate after successful verification
    } else {
      alert('Passwords do not match or are too short!');
    }
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <Ionicons name="arrow-back" size={24} style={styles.backButton} />  
          </TouchableOpacity>
         
      </View>
      <Text style={styles.label}>Set New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Set Password"
          style={styles.input}
          secureTextEntry={secureText}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons name={secureText ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry={secureConfirmText}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setSecureConfirmText(!secureConfirmText)}>
          <Ionicons name={secureConfirmText ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15,
    height: 40, 
    marginBottom: 20, // Space below the header
    backgroundColor: '#1F3F7F',
  },
  backButton: {
    color: 'white', // Customize back button color
    fontSize: 24,
    marginRight: 10,
    marginLeft: 10,
  },
 
  
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#123884"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20

  },
  input: {
    flex: 1,
    fontSize: 16,
    
    
  },
  button: {
    backgroundColor: '#123884',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
