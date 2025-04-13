import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- Data for the Menu ---
// Costs are assumed per package for meals, per item for add-ons
const menuData = {
  breakfast: {
    veg: {
      items: ['Idli', 'Pongal', 'Coconut Chutney', 'Tomato Chutney', 'Sambar', 'Kesari'],
      cost: 60, // Example cost for Veg Breakfast package
    },
    nonVeg: {
      items: ['Idli', 'Chicken Gravy', 'Coconut Chutney', 'Poori', 'Potato Masala', 'Kesari'],
      cost: 80, // Example cost for Non-Veg Breakfast package
    },
  },
  lunch: {
    veg: {
      items: ['White Rice', 'Sambar', 'Rasam', 'Curd', 'Potato Fry', 'Carrot Poriyal', 'Appalam', 'Pickle', 'Gulab Jamun'],
      cost: 90,
    },
    nonVeg: {
      items: ['White Rice', 'Chicken Gravy', 'Fish Fry', 'Egg Roast', 'Rasam', 'Bajia', 'Bread Halwa'],
      cost: 120,
    },
  },
  dinner: {
    veg: {
      items: ['Chapati', 'Dosa', 'Idli', 'Tomato Chutney', 'Channa Masala', 'Gulab Jamun'],
      cost: 70,
    },
    nonVeg: {
      items: ['Idli', 'Chicken Gravy', 'Parotta', 'Ghee Rice', 'Non Veg Kuruma', 'Kesari'],
      cost: 100,
    },
  },
  addOns: [
    { name: 'Fruit Salad', cost: 100 },
    { name: 'Payasam', cost: 25 },
    { name: 'Ice Cream', cost: 20 },
  ],
};

// --- Reusable Radio Button Component ---
const RadioButton = ({ selected, onPress }) => (
  <TouchableOpacity style={styles.radioButtonOuter} onPress={onPress}>
    {selected && <View style={styles.radioButtonInner} />}
  </TouchableOpacity>
);

// --- Reusable Checkbox Component ---
const Checkbox = ({ selected, onPress }) => (
  <TouchableOpacity style={styles.checkboxOuter} onPress={onPress}>
    {selected && <View style={styles.checkboxInner} />}
  </TouchableOpacity>
);

// --- Main Donate Food Screen Component ---
const DonateFoodScreen = () => {
  const [selectedBreakfast, setSelectedBreakfast] = useState(null); // 'veg', 'nonVeg', or null
  const [selectedLunch, setSelectedLunch] = useState(null); // 'veg', 'nonVeg', or null
  const [selectedDinner, setSelectedDinner] = useState(null); // 'veg', 'nonVeg', or null
  const [selectedAddOns, setSelectedAddOns] = useState({}); // { 'Fruit Salad': true, 'Payasam': false, ... }

  // --- Handlers for Selection ---
  const handleMealSelect = useCallback((mealType, option) => { // mealType: 'breakfast', 'lunch', 'dinner'; option: 'veg', 'nonVeg'
    switch (mealType) {
      case 'breakfast':
        setSelectedBreakfast(prev => (prev === option ? null : option)); // Allow deselection by clicking again
        break;
      case 'lunch':
        setSelectedLunch(prev => (prev === option ? null : option));
        break;
      case 'dinner':
        setSelectedDinner(prev => (prev === option ? null : option));
        break;
    }
  }, []);

  const handleAddOnToggle = useCallback((addOnName) => {
    setSelectedAddOns(prev => ({
      ...prev,
      [addOnName]: !prev[addOnName], // Toggle the selection state
    }));
  }, []);

  // --- Calculate Total Cost ---
  const calculateTotalCost = () => {
    let total = 0;
    if (selectedBreakfast) total += menuData.breakfast[selectedBreakfast].cost;
    if (selectedLunch) total += menuData.lunch[selectedLunch].cost;
    if (selectedDinner) total += menuData.dinner[selectedDinner].cost;

    menuData.addOns.forEach(addOn => {
      if (selectedAddOns[addOn.name]) {
        total += addOn.cost;
      }
    });
    return total;
  };

  // --- Submit Handler ---
  const handleSubmit = () => {
    const finalCost = calculateTotalCost();
    const selections = {
      breakfast: selectedBreakfast ? `${selectedBreakfast} (₹${menuData.breakfast[selectedBreakfast].cost})` : 'None',
      lunch: selectedLunch ? `${selectedLunch} (₹${menuData.lunch[selectedLunch].cost})` : 'None',
      dinner: selectedDinner ? `${selectedDinner} (₹${menuData.dinner[selectedDinner].cost})` : 'None',
      addOns: menuData.addOns
        .filter(addOn => selectedAddOns[addOn.name])
        .map(addOn => `${addOn.name} (₹${addOn.cost})`),
    };

    const addOnsString = selections.addOns.length > 0 ? selections.addOns.join(', ') : 'None';

    Alert.alert(
      'Donation Summary',
      `Breakfast: ${selections.breakfast}\nLunch: ${selections.lunch}\nDinner: ${selections.dinner}\nAdd-ons: ${addOnsString}\n\nTotal Cost: ₹${finalCost}`,
      [{ text: 'OK' }]
    );

    // In a real app, you would send this data to your backend API here
    console.log('Selected Breakfast:', selections.breakfast);
    console.log('Selected Lunch:', selections.lunch);
    console.log('Selected Dinner:', selections.dinner);
    console.log('Selected Add-ons:', selections.addOns);
    console.log('Total Cost:', finalCost);
  };

  // --- Helper to Render Meal Option Box ---
  const renderMealOption = (mealType, optionType, data, selected) => (
    <TouchableOpacity
      style={[styles.mealOptionBox, selected && styles.selectedMealOptionBox]}
      onPress={() => handleMealSelect(mealType, optionType)}
      activeOpacity={0.7}
    >
      <View style={styles.mealHeader}>
        <Text style={styles.mealOptionTitle}>{optionType === 'veg' ? 'Veg' : 'Non-Veg'}</Text>
        <RadioButton
          selected={selected}
          onPress={() => handleMealSelect(mealType, optionType)}
        />
      </View>
      {data.items.map((item, index) => (
        <Text key={index} style={styles.mealItemText}>{item}</Text>
      ))}
      <Text style={styles.mealTotalText}>Total   ₹{data.cost}</Text>
    </TouchableOpacity>
  );

  // --- Render Function ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donate Food</Text>
      </View>
      <Text style={styles.subHeader}>Be the Reason Someone Eats Today.</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Meal Sections */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>BREAKFAST</Text>
          <View style={styles.optionsRow}>
            {renderMealOption('breakfast', 'veg', menuData.breakfast.veg, selectedBreakfast === 'veg')}
            {renderMealOption('breakfast', 'nonVeg', menuData.breakfast.nonVeg, selectedBreakfast === 'nonVeg')}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>LUNCH</Text>
          <View style={styles.optionsRow}>
            {renderMealOption('lunch', 'veg', menuData.lunch.veg, selectedLunch === 'veg')}
            {renderMealOption('lunch', 'nonVeg', menuData.lunch.nonVeg, selectedLunch === 'nonVeg')}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>DINNER</Text>
          <View style={styles.optionsRow}>
            {renderMealOption('dinner', 'veg', menuData.dinner.veg, selectedDinner === 'veg')}
            {renderMealOption('dinner', 'nonVeg', menuData.dinner.nonVeg, selectedDinner === 'nonVeg')}
          </View>
        </View>

        {/* Special Add-ons Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>SPECIAL ADD-ONS (OPTIONAL)</Text>
          <View style={styles.addOnsBox}>
            {menuData.addOns.map((addOn, index) => (
              <TouchableOpacity
                key={index}
                style={styles.addOnItem}
                onPress={() => handleAddOnToggle(addOn.name)}
                activeOpacity={0.7}
              >
                <Text style={styles.addOnText}>{`${addOn.name} - Rs.${addOn.cost}`}</Text>
                <Checkbox
                  selected={!!selectedAddOns[addOn.name]} // Use !! to convert potential undefined to boolean
                  onPress={() => handleAddOnToggle(addOn.name)}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
         {/* --- NEW: Total Amount Display --- */}
         <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountLabel}>Total Amount:</Text>
          <Text style={styles.totalAmountValue}>₹{calculateTotalCost()}</Text>
        </View>
        {/* --- END NEW --- */}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding:10, 
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
  subHeader: {
    
    fontSize: 18,
    fontWeight:'bold',
    color: '#123884',
    textAlign: 'center',
    paddingVertical: 15,
    //backgroundColor: '#ffffff', // Keep subtitle background white
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 30, // Ensure space below submit button
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff', // White background for sections
    borderRadius: 8,
    padding: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center', // Center section titles like BREAKFAST, LUNCH...
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealOptionBox: {
    flex: 1, // Take up half the space
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5, // Add spacing between boxes
    backgroundColor: '#fff',
  },
  selectedMealOptionBox: {
    borderColor: '#007AFF', // Highlight selected box
    borderWidth: 1.5,
    backgroundColor: '#e6f2ff', // Light blue background when selected
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealOptionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#123884',
  },
  mealItemText: {
    fontSize: 13,
    color: '#123884',
    marginBottom: 3,
    marginLeft: 5, // Indent items slightly
  },
  mealTotalText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#123884',
    textAlign: 'right',
  },
  radioButtonOuter: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  addOnsBox: {
     // Styles for the container of add-on items if needed (e.g., border)
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
  },
  addOnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  addOnText: {
    fontSize: 14,
    color: '#123884',
    flex: 1, // Allow text to take available space
    marginRight: 10,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Vertically align text
    paddingVertical: 15,
    paddingHorizontal: 20, // More padding for emphasis
    marginTop: 15, // Space above this section
    backgroundColor: '#f8f8f8', // Slightly different background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5, // Align roughly with section boxes
},
totalAmountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#123884', // Dark grey label
},
totalAmountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#123884', // Blue value stands out
},
  checkboxOuter: {
    height: 22,
    width: 22,
    borderRadius: 11, // Keep it circular like the image
    borderWidth: 1.5,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  submitButton: {
    backgroundColor: '#123884', // Blue color from image
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10, // Match scroll container padding
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DonateFoodScreen;