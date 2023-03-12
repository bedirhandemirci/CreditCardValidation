import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import validateCreditCard from './creditCardValidator';
import defaultCards from './clientdatabase';

export default function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleValidate = () => {
    const card = {
      cardNumber,
      expirationDate,
      cvv,
      cardholderName
    };

    // Check if the entered values match any of the default card values
    const isDefault = Object.values(defaultCards).some(
      (defaultCard) =>
        card.cardNumber === defaultCard.cardNumber &&
        card.cardholderName === defaultCard.cardholderName &&
        card.expirationDate === defaultCard.expirationDate &&
        card.cvv === defaultCard.cvv
    );

    // If the values match any of the default card values, set isValid to true
    setIsValid(isDefault ? true : validateCreditCard(card.cardNumber, card.cardholderName, card.expirationDate, card.cvv));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Credit Card Number</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Cardholder Name</Text>
      <TextInput
        style={styles.input}
        value={cardholderName}
        onChangeText={setCardholderName}
      />
      <Text style={styles.label}>Expiration Date (MM/YY)</Text>
      <TextInput
        style={styles.input}
        value={expirationDate}
        onChangeText={setExpirationDate}
        keyboardType="numeric"
      />
      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        value={cvv}
        onChangeText={setCvv}
        keyboardType="numeric"
      />
      <Button title="Validate" onPress={handleValidate} />
      {isValid === true && <Text style={styles.success}>Valid credit card!</Text>}
      {isValid === false && <Text style={styles.error}>Invalid credit card!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5
  },
  success: {
    color: 'green',
    marginTop: 10
  },
  error: {
    color: 'red',
    marginTop: 10
  }
});


