import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const donations = [
  { id: "1", donorName: "John Doe", description: "Food donation", status: "Pending" },
  { id: "2", donorName: "Jane Smith", description: "Clothes donation", status: "Pending" },
  { id: "3", donorName: "Robert Brown", description: "Books donation", status: "Pending" },
];

const DonationManagementScreen = ({ navigation }) => {
  const handleAccept = (id) => {
    console.log(`Accepted donation ID: ${id}`);
  };

  const handleDecline = (id) => {
    console.log(`Declined donation ID: ${id}`);
  };

  const renderDonationCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <Text style={styles.label}>Donor Name</Text>
          <Text style={styles.label}>Donation Type & Description</Text>
          <Text style={styles.label}>Attachments if any</Text>
          <Text style={styles.label}>Status</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.value}>{item.donorName}</Text>
          <Text style={styles.value}>{item.description}</Text>
          <Text style={styles.value}>-</Text>
          <Text style={styles.value}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => handleAccept(item.id)}>
          <Text style={styles.acceptButton}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDecline(item.id)}>
          <Text style={styles.declineButton}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donation Management</Text>
      </View>

      {/* Donation List */}
      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={renderDonationCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  card: {
    backgroundColor: "#E5E5E5",
    borderWidth: 1,
    borderColor: "#123884",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
  },
  leftColumn: {
    flex: 6,
  },
  rightColumn: {
    flex: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#123884",
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    color: "#123884",
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#123884",
  },
  acceptButton: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",

  },
  declineButton: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DonationManagementScreen;
