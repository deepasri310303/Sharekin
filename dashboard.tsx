import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const Dashboard = () => {
  // State to store Total Donation and Food Processed
  const [totalDonation, setTotalDonation] = useState(0);
  const [foodProcessed, setFoodProcessed] = useState(0);
  const navigation = useNavigation<any>();

  // Simulating data update (This should be replaced with real API calls)
  useEffect(() => {
    const fetchData = () => {
      setTotalDonation(50000); // Simulated total donations in rupees
      setFoodProcessed(1200); // Simulated processed food in kg
    };
    fetchData();
  }, []);

  const requests = Array(8).fill({
    id: Math.random().toString(),
    name: "Sample Request",
    type: "Food",
    category: "Groceries",
    status: "Pending",
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>  
          <Ionicons name="menu" size={24} style={styles.backButton} />  
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donation Management</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Stats Section */}
        <Text style={styles.sectionTitle}>Stats Section</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statText}>Total Donation</Text>
            <Text style={styles.statNumber}>₹{totalDonation.toLocaleString()}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statText}>Food Processed</Text>
            <Text style={styles.statNumber}>{foodProcessed.toLocaleString()} kg</Text>
          </View>
        </View>

        {/* Manage Section */}
        <View style={styles.manageSection}>
          <Text style={styles.manageTitle}>Manage Section</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableColumn, styles.headerTextStyle]}>Request Name</Text>
            <Text style={[styles.tableColumn, styles.headerTextStyle]}>Donation Type</Text>
            <Text style={[styles.tableColumn, styles.headerTextStyle]}>Category</Text>
            <Text style={[styles.tableColumn, styles.headerTextStyle]}>Actions</Text>
          </View>

          {/* Table Data */}
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id}
            renderItem={() => (
              <View style={styles.tableRow}>
                <Text style={styles.tableColumn}>Sample Request</Text>
                <Text style={styles.tableColumn}>Food</Text>
                <Text style={styles.tableColumn}>Groceries</Text>
                <View style={styles.actions}>
                  <TouchableOpacity>
                    <Text style={styles.approve}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.reject}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    height: 50, 
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#1F3F7F',
    paddingHorizontal: 15,
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'white', 
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#123884",
    marginTop:10,
    marginBottom:4,

  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  statBox: {
    backgroundColor: "#123884",
    paddingVertical: 60,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
    marginBottom:10,
    marginTop:5,
  },
  statText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:"center",
    
    
    
  },
  statNumber: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    flexDirection:"row",
  },
  manageSection: {
    marginHorizontal: 10,
    backgroundColor: "#123884",
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  },
  manageTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  headerTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    fontSize: 12,
  },
  tableColumn: {
    flex: 1,
    textAlign: "center",
    color: "#123884",
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  approve: {
    color: "green",
    fontWeight: "bold",
    fontSize: 12,
  },
  reject: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#123884",
    paddingVertical: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default Dashboard;
