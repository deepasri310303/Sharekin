import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const groceryItems = [
  { name: 'Rice', price: 60 },
  { name: 'Sugar', price: 40 },
  { name: 'Salt', price: 30 },
  { name: 'Milk', price: 68 },
  { name: 'Oil', price: 150 },
  { name: 'Wheat Flour', price: 60 },
  { name: 'Dal', price: 190 },
  { name: 'Spices', price: 70 },
  { name: 'Biscuits', price: 50 },
  { name: 'Vegetables', price: 80 },
  { name: 'Fruits', price: 80 },
];

const GroceryKit = () => {
  const [quantities, setQuantities] = useState(Array(groceryItems.length).fill(0));

  const increment = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const decrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) newQuantities[index]--;
    setQuantities(newQuantities);
  };

  const totalAmount = quantities.reduce((total, qty, index) => {
    return total + qty * groceryItems[index].price;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grocery Kit</Text>
      </View>

      <Text style={styles.title}>A Grocery Kit, A Step Toward Change.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Select Grocery Items</Text>

        <ScrollView>
          {groceryItems.map((item, index) => (
            <View style={styles.itemRow} key={index}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>-Rs.{item.price}</Text>

              <TouchableOpacity style={styles.button} onPress={() => increment(index)}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.quantityBox}
                value={quantities[index].toString()}
                editable={false}
              />

              <TouchableOpacity style={styles.button} onPress={() => decrement(index)}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalText}>Rs.{totalAmount}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    height: 50,
    backgroundColor: '#1F3F7F',
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    color: '#2a4d8f',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
  backButton: { color: 'white', fontSize: 24, marginRight: 10 },
  headerTitle: { fontWeight: 'bold', color: 'white', fontSize: 20 },
  card: {
    borderWidth: 1,
    borderColor: '#b0c4de',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f0f8ff',
    flex: 1,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#123884',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    flex: 2,
    fontSize: 14,
    color:'#123884',
  },
  itemPrice: {
    flex: 1,
    fontSize: 14,
    color: '#123884',
  },
  button: {
    backgroundColor: '#2a4d8f',
    borderWidth:1,
    borderRadius: 2,
    marginHorizontal:13,
    width:35,
    height:35,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    textAlign:'center',
    
  },
  quantityBox: {
    width: 35,
    height: 35,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 0,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth:1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#123884',
  },
  submitButton: {
    backgroundColor: '#2a4d8f',
    padding: 15,
    marginTop:10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GroceryKit;
