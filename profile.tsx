import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ProfileInfo = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    OrphanageName: "",
    Email: "",
    ContactNo: "",
    Address: "",
    OrphanageType: "",
    NumberOfResidents: "",
    Description: "",
    Website: "",
    GovernmentCert: null,
    TrustCert: null,
    TaxCert: null,
    Photos: [],
    AccountHolderName: "",
    BranchName: "",
    AccountNumber: "",
    IFSCCode: "",
    UPIId: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleInputChange = (name, value) => {
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const selectDocument = async (field) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.canceled) return;
      setProfileData((prev) => ({ ...prev, [field]: result.uri }));
    } catch (error) {
      Alert.alert("Error", "Failed to pick document.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData((prev) => ({
        ...prev,
        Photos: [...prev.Photos, result.assets[0].uri],
      }));
    }
  };

  const handleSubmit = () => {
    if (!profileData.OrphanageName || !profileData.Email || !profileData.ContactNo) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    if (profileData.Password !== profileData.ConfirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    Alert.alert("Success", "Profile information saved successfully.");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Info</Text>
      </View>

      {[
        "OrphanageName",
        "Email",
        "ContactNo",
        "Address",
        "OrphanageType",
        "NumberOfResidents",
        "Description",
        "Website",
      ].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.replace(/([A-Z])/g, " $1").trim()}
          value={profileData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      ))}

      <Text style={styles.sectionTitle}>Documents & Certifications</Text>
      {[
        { field: "GovernmentCert", label: "Government Registration Certificate" },
        { field: "TrustCert", label: "Trust Registration Certificate" },
        { field: "TaxCert", label: "Tax Certification Documents" },
      ].map(({ field, label }) => (
        <View key={field} style={styles.documentRow}>
          <Text style={styles.docLabel}>{label}</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => selectDocument(field)}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Orphanage Photos</Text>
      <View style={styles.imageRow}>
        {profileData.Photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.uploadedImage} />
        ))}
      </View>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>

      {["AccountHolderName", "BranchName", "AccountNumber", "IFSCCode", "UPIId"].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.replace(/([A-Z])/g, " $1").trim()}
          value={profileData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      ))}

      {[
        { field: "Password", visible: passwordVisible, setVisible: setPasswordVisible },
        { field: "ConfirmPassword", visible: confirmPasswordVisible, setVisible: setConfirmPasswordVisible },
      ].map(({ field, visible, setVisible }) => (
        <View key={field} style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={field.replace(/([A-Z])/g, " $1").trim()}
            secureTextEntry={!visible}
            value={profileData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
          />
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eyeIcon}>
            <Ionicons name={visible ? "eye" : "eye-off"} size={20} />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F8F8" },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "#1F3F7F", height: 50, paddingHorizontal: 10,marginBottom:10 },
  backButton: { color: "white", marginRight: 10 },
  headerTitle: { fontWeight: "bold", color: "white", fontSize: 20 },
  input: { backgroundColor: "#EEE", padding: 12, borderRadius: 8, marginVertical: 10},
  sectionTitle: { fontWeight: "bold", fontSize: 18, marginTop: 20 , color:"#123884" },
  documentRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 6 },
  docLabel: { flex: 1, fontSize: 14 , color:"#123884"},
  uploadButton: { backgroundColor: "#123884", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8,marginBottom:10 },
  buttonText: { color: "white", fontWeight: "bold",textAlign:"center" },
  imageRow: { flexDirection: "row", marginVertical: 10 },
  uploadedImage: { width: 60, height: 60, borderRadius: 8, marginRight: 8 },
  passwordContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#EEE", borderRadius: 8, marginVertical: 10 },
  passwordInput: { flex: 1, padding: 12 },
  eyeIcon: { padding: 12 },
  saveButton: { backgroundColor: "#123884", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10,marginBottom:40,marginVertical:6 },
  saveButtonText: { color: "white", fontWeight: "bold" },
});

export default ProfileInfo;
