import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SavedMenuScreen = ({ navigation, route }) => {
  // Use optional chaining to prevent errors if route.params is undefined
  const savedMenu = route?.params?.savedMenu || {
    breakfast: "No items",
    lunch: "No items",
    snacks: "No items",
    dinner: "No items",
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <Ionicons name="arrow-back" size={24} style={styles.backButton} />  
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Customized menu</Text>
      </View>

      <ScrollView style={styles.menuContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍽 Breakfast</Text>
          <Text style={styles.menuText}>{savedMenu.breakfast}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍽 Lunch</Text>
          <Text style={styles.menuText}>{savedMenu.lunch}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍽 Snacks</Text>
          <Text style={styles.menuText}>{savedMenu.snacks}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍽 Dinner</Text>
          <Text style={styles.menuText}>{savedMenu.dinner}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding:20,
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
  headerTitle: {
    fontWeight: 'bold',
    color: 'white', 
    fontSize: 20,
  },
  menuContainer: {
    padding: 5,
  },
  card: {
    backgroundColor: "rgba(114, 146, 209, 0.14)", 
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#123884",
  },
  menuText: {
    fontSize: 16,
    color: "#123884",
  },
});

export default SavedMenuScreen;
