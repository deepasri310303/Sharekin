import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native"; 

const OrphanageSignUp = () => {
  const navigation = useNavigation(); 

  // ✅ Fix: Explicitly define the type
  const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const pickDocument = async (field: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });

      if (!result.canceled && result.assets) {
        setSelectedFiles((prevFiles) => ({
          ...prevFiles,
          [field]: result.assets[0].name,
        }));
        Alert.alert("File Selected", `Selected file: ${result.assets[0].name}`);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />  
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Orphanage Name" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contact No" placeholderTextColor="#999" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Address" placeholderTextColor="#999" multiline />

      {/* Upload Sections */}
      {["Government Certificate", "Trust Certificate", "Tax Documents"].map((field, index) => (
        <View key={index} style={styles.uploadContainer}>
          <View style={styles.uploadTextContainer}>
            <Text style={styles.uploadText}>{`Upload ${field}`}</Text>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(field)}>
            <Ionicons name="document" size={20} color="white" />
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
          {selectedFiles[field] && <Text style={styles.fileName}>{selectedFiles[field]}</Text>}
        </View>
      ))}

      {/* Password Fields */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Set Password"
          placeholderTextColor="#999"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={22} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={!confirmPasswordVisible}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Ionicons name={confirmPasswordVisible ? "eye-off" : "eye"} size={22} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    height: 40, 
    marginBottom: 20,
    backgroundColor: '#1F3F7F',
    alignSelf: "stretch"
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    marginVertical: 8,
    color: "black",
    marginTop: 10,
    marginBottom: 10
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    marginTop: 10,
    marginBottom: 10
  },
  uploadTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  uploadText: {
    fontSize: 15,
    color: "#123884",
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D428A",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  uploadButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
    color: "black",
  },
  fileName: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#1D428A",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrphanageSignUp;
