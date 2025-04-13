import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import Checkbox from 'expo-checkbox';
import SafeAreaView from 'react-native-safe-area-view';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const vegItems = {
  base: [
    { name: 'Idli', price: 30 },
    { name: 'Dosa', price: 40 },
    { name: 'Pongal', price: 40 },
    { name: 'Parotta', price: 40 },
    { name: 'chapati', price: 15 },
    { name: 'Poori', price: 30 },
    { name: 'White Rice', price: 30 },
    { name: 'Tamarind Rice', price: 40 },
    { name: 'Tomato Rice', price: 40 },
    { name: 'Veg Pulao', price: 50 },
    { name: 'Veg Biryani', price: 50 }
  ],
  curries: [
    { name: 'Sambar', price: 20 },
    { name: 'Tomato Chutney', price: 20 },
    { name: 'Coconut Chutney', price: 20 },
    { name: 'Veg Kurma', price: 30 },
    { name: 'Chana Masala', price: 40 },
    { name: 'Paneer Butter Masala', price: 50 },
    { name: 'Dal Makhni', price: 30 },
    { name: 'Rasam', price: 20 }
  ],
  veggies: [
    { name: 'Avial', price: 20 },
    { name: 'Poricha Kootu', price: 20 },
    { name: 'Potato Fry', price: 30 },
    { name: 'Cabbage Poriyal', price: 20 },
    { name: 'Brinjal Masala', price: 20 },
    { name: 'Vendakkai Poriyal', price: 20 },
    { name: 'Carrot&Beans Poriyal', price: 20 }
  ],
  addons: [
    { name: 'Paneer Tikka', price: 60 },
    { name: 'Aloo Gobi', price: 40 },
    { name: 'Appalam', price: 10 },
    { name: 'Pickle', price: 5 },
    { name: 'Curd', price: 10 },
    { name: 'Raita', price: 15 },
    { name: 'Potato Chips', price: 20 },
    { name: 'Fruit Salad', price: 50 },
    { name: 'Payasam', price: 25 },
    { name: 'Butter Milk', price: 10 },
    { name: 'Gulab Jamun', price: 15 },
    { name: 'Rava Kesari', price: 20 }
  ]
};

const nonVegItems = {
  base: [
    { name: 'Idli', price: 30 },
    { name: 'Dosa', price: 40 },
    { name: 'Parotta', price: 40 },
    { name: 'chapati', price: 15 },
    { name: 'White Rice', price: 30 },
    { name: 'Jeera Rice', price: 40 },
    { name: 'Chicken Biryani', price: 120 },
    { name: 'Egg Biryani', price: 80 }
  ],
  gravy: [
    { name: 'Chicken Gravy', price: 60 },
    { name: 'Mutton Gravy', price: 80 },
    { name: 'Fish Curry', price: 70 },
    { name: 'Egg Curry', price: 30 },
    { name: 'Chettinad Chicken', price: 70 }
  ],
  protein: [
    { name: 'Chicken 65', price: 40 },
    { name: 'Fish Fry', price: 60 },
    { name: 'Egg Roast', price: 30 },
    { name: 'Tandoori Chicken', price: 80 },
    { name: 'Mutton Sukka', price: 80 },
    { name: 'Prawn Fry', price: 80 },
    { name: 'Chicken Tikka', price: 70 }
  ],
  addons: [
    { name: 'Raita', price: 15 },
    { name: 'Pickle', price: 5 },
    { name: 'Potato Chips', price: 20 },
    { name: 'Fruit Salad', price: 50 },
    { name: 'Payasam', price: 25 },
    { name: 'Butter Milk', price: 10 },
    { name: 'Gulab Jamun', price: 15 },
    { name: 'Rava Kesari', price: 20 }
  ]
};

export default function CustomizeFoodScreen() {
 
  const [selectedMenuType, setSelectedMenuType] = useState("Veg");
  const [selectedItems, setSelectedItems] = useState({});
  const [totalMembers, setTotalMembers] = useState('');
  const toggleItem = (itemKey) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const calculateTotal = (totalMembers:any) => {
    const menu = selectedMenuType === 'Veg' ? vegItems : nonVegItems;
    let total = 0;
    Object.keys(menu).forEach((category) => {
      menu[category].forEach((item) => {
        if (selectedItems[item.name]) {
          total += item.price;
        }
      });
    });
    return total*totalMembers;
  };

  const menuItems = selectedMenuType === 'Veg' ? vegItems : nonVegItems;
  const navigation= useNavigation();
  const handleSubmit = () => {
    if (totalMembers === '') {
      alert('Please enter total members');
      return;
    }
   
  };
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container}>
    <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <Ionicons name="arrow-back" size={24} style={styles.backButton} />  
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Customize Food</Text>
     </View>
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

      {Object.entries(menuItems).map(([category, items]) => (
        <View key={category} style={styles.categoryBox}>
          <Text style={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          {items.map((item) => (
            <View key={item.name} style={styles.itemRow}>
               <Checkbox
                value={Boolean(selectedItems[item.name])}
                onValueChange={() => toggleItem(item.name)}
                style={{ marginRight: 8 }}
            />
             <Text style={selectedMenuType === 'Veg' ? styles.vegText : styles.nonVegText}>
             {item.name} - ₹{item.price}
             </Text>

            </View>
          ))}
        </View>
      ))}
      <View style={{flexDirection:'row'}}>
      <View style={styles.totalBox}>
      
        <TextInput
            placeholder="Members"
            style={styles.input}
            keyboardType="numeric"
            value= {totalMembers}
            onChangeText={(text) => setTotalMembers(text)}
            />
      </View>
      <View style={styles.totalBox2}>

            <Text style={styles.input}>Total Amount: ₹ {calculateTotal(totalMembers)} for {totalMembers} members</Text>
      </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, calculateTotal(totalMembers) === 0 && { backgroundColor: 'gray' }]}
        disabled={calculateTotal(totalMembers) === 0}
        onPress={handleSubmit}
        >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex:1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15,
    height: 40, 
    marginBottom: 2, // Space below the header
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
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 10,
  },
  selectedMenuType: {
    backgroundColor: "#123884",
  },
  menuTypeText: {
    color: "white",
    fontWeight: "bold",

  },
  bottombox:{
    
    borderWidth:1,
    marginVertical:15,
    width:'40%',
    marginHorizontal:10,

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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'transparent'
  },
  activeTab: {
    borderColor: '#000',
  },
  tabText: {
    fontWeight: 'bold',
    
  },
  vegText: {
    color: '#123884', 
  },
  
  nonVegText: {
    color: '#123884', 
  },
  
  categoryBox: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  categoryTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#123884',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:5,
  },
  totalBox: {
    marginVertical: 15,
    width:'20%',
    marginHorizontal:10,
    maxHeight:35,
    

  },
  totalBox2: {
    marginVertical: 15,
    width:'70%',
    marginHorizontal:10,
    

  },
  input: {
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    color:'#123884',
  },
  submitButton: {
    backgroundColor: '#2e4a7d',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  }



  
});
