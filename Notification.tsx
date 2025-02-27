import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FoodRedistribution = () => {
  // Example Data
  const foodData = {
    donorName: "John Doe",
    foodType: "Vegetable Biryani",
    quantity: "10 packs",
    mealTime: "12:30 PM",
    status: "Pending",
    transportation: "Available",
    location: "XYZ Street, City Center",
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <Ionicons name="arrow-back" size={24} style={styles.backButton} />  
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notification</Text>
      </View>

      {/* Food Details Card */}
      <ScrollView>
        <View style={styles.card}>
          {Object.entries(foodData).map(([key, value], index) => (
            <View key={index} style={styles.rowContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>{formatLabel(key)}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.value}>{value}</Text>
              </View>
              {/* Full Horizontal Line */}
              <View style={styles.fullHorizontalLine} />
            </View>
          ))}

          {/* Accept / Decline Buttons Inside Card */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Function to format keys into readable labels
const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  headerTitle: {
    fontWeight: 'bold',
    color: 'white', 
    fontSize: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#1E3A8A",
    borderRadius: 5,
    backgroundColor: "#E5E7EB",
    padding: 10,
  },
  rowContainer: {
    marginBottom: 5, // Adds spacing between rows
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    color:"#123884"
  },
  verticalLine: {
    width:1,
    height: "100%",
    backgroundColor: "#123884",
    marginHorizontal: 10,
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: "#123884",
    textAlign: "right",
  },
  fullHorizontalLine: {
    height: 1,
    backgroundColor: "#1E3A8A",
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#1E3A8A",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 5,
  },
  declineButton: {
    flex: 1,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  acceptText: {
    color: "white",
    fontWeight: "bold",
  },
  declineText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FoodRedistribution;
