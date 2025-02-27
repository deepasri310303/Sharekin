import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OrphanageMenuManagement = () => {
  const navigation = useNavigation();

  const defaultMenus = {
    Veg: {
      Breakfast: [{ name: "Idli", price: 30 }, { name: "Dosa", price: 40 }],
      Lunch: [{ name: "Rice", price: 50 }, { name: "Dal", price: 40 }],
      Snacks: [{ name: "Biscuits", price: 20 }, { name: "Fruits", price: 25 }],
      Dinner: [{ name: "Chapati", price: 35 }, { name: "Paneer Curry", price: 60 }],
    },
    NonVeg: {
      Breakfast: [{ name: "Egg Sandwich", price: 50 }, { name: "Omelette", price: 40 }],
      Lunch: [{ name: "Chicken Curry", price: 100 }, { name: "Rice", price: 60 }],
      Snacks: [{ name: "Chicken Nuggets", price: 80 }],
      Dinner: [{ name: "Fish Curry", price: 120 }, { name: "Chapati", price: 35 }],
    },
  };

  const [selectedMenuType, setSelectedMenuType] = useState("Veg");
  const [customMenu, setCustomMenu] = useState(JSON.parse(JSON.stringify(defaultMenus)));
  const [mealInputs, setMealInputs] = useState({
    Breakfast: { name: "", price: "" },
    Lunch: { name: "", price: "" },
    Snacks: { name: "", price: "" },
    Dinner: { name: "", price: "" },
  });

  const addMealItem = (mealType) => {
    const { name, price } = mealInputs[mealType];
    if (name.trim() === "" || price.trim() === "") return;

    setCustomMenu((prev) => ({
      ...prev,
      [selectedMenuType]: {
        ...prev[selectedMenuType],
        [mealType]: [...prev[selectedMenuType][mealType], { name, price: parseFloat(price) }],
      },
    }));

    setMealInputs((prev) => ({ ...prev, [mealType]: { name: "", price: "" } }));
  };

  const removeMealItem = (mealType, index) => {
    setCustomMenu((prev) => {
      const updatedMeals = [...prev[selectedMenuType][mealType]];
      updatedMeals.splice(index, 1);
      return {
        ...prev,
        [selectedMenuType]: {
          ...prev[selectedMenuType],
          [mealType]: updatedMeals,
        },
      };
    });
  };

  const handleSave = () => {
    console.log("Menu Saved:", customMenu);
    alert("Menu saved successfully!");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orphanage Menu Management</Text>
      </View>

      {/* Menu Type Selection */}
      <VegNonVegToggle selectedMenuType={selectedMenuType} setSelectedMenuType={setSelectedMenuType} />

      {/* Meal Sections */}
      {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
        <View key={meal} style={styles.mealSection}>
          <Text style={styles.mealTitle}>{meal}</Text>

          {/* Input Row for Meal Item */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder={`Add ${meal} item`}
              value={mealInputs[meal].name}
              onChangeText={(value) =>
                setMealInputs((prev) => ({
                  ...prev,
                  [meal]: { ...prev[meal], name: value },
                }))
              }
            />
            <TextInput
              style={styles.inputPrice}
              placeholder="₹ Price"
              keyboardType="numeric"
              value={mealInputs[meal].price}
              onChangeText={(value) =>
                setMealInputs((prev) => ({
                  ...prev,
                  [meal]: { ...prev[meal], price: value },
                }))
              }
            />
            <TouchableOpacity style={styles.addButton} onPress={() => addMealItem(meal)}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Meal List with Remove Button */}
          <FlatList
            data={customMenu[selectedMenuType][meal]}
            keyExtractor={(item, index) => `${meal}-${index}`}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <View style={styles.mealItem}>
                <Text style={styles.mealText}>
                  {item.name} - ₹{item.price}
                </Text>
                <TouchableOpacity onPress={() => removeMealItem(meal, index)}>
                  <Ionicons name="trash" size={20} style={styles.removeIcon} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ))}

      {/* Single Save Button at the End */}
      

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const VegNonVegToggle = ({ selectedMenuType, setSelectedMenuType }) => {
  return (
    <View style={styles.toggleContainer}>
      {/* Veg Button */}
      <TouchableOpacity
        style={[styles.button, selectedMenuType === "Veg" ? styles.activeButton : styles.inactiveButton]}
        onPress={() => setSelectedMenuType("Veg")}
      >
        <Text style={[styles.buttonText, selectedMenuType === "Veg" ? styles.activeText : styles.inactiveText]}>
          Veg
        </Text>
      </TouchableOpacity>

      {/* Non-Veg Button */}
      <TouchableOpacity
        style={[styles.button, selectedMenuType === "NonVeg" ? styles.activeButton : styles.inactiveButton]}
        onPress={() => setSelectedMenuType("NonVeg")}
      >
        <Text style={[styles.buttonText, selectedMenuType === "NonVeg" ? styles.activeText : styles.inactiveText]}>
          Non-Veg
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
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
  menuTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  menuTypeButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  selectedMenuType: {
    backgroundColor: "#123884",
  },
  menuTypeText: {
    color: "white",
    fontWeight: "bold",
  },
  mealSection: {
    marginTop: 20,
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#123884",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  inputPrice: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: "#123884",
    padding: 10,
    marginLeft: 5,
    borderRadius: 5,
  },
  addText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  removeIcon: {
    color: "red",
  },
  saveButtonContainer: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom:20,
    
  },
  saveButton: {
    backgroundColor: "#123884",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#123884",
  },
  inactiveButton: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "#555",
  },
});




export default OrphanageMenuManagement;
