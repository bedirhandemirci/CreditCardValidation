import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import validateCreditCard from './creditCardValidator';

export default function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleValidate = () => {
    const card = {
      cardNumber,
      expirationDate,
      cvv,
      cardholderName
    };

    setIsValid(validateCreditCard(card.cardNumber, card.cardholderName, card.expirationDate, card.cvv));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Credit Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your credit card number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <Text style={styles.label}>Cardholder Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the cardholder's name"
        value={cardholderName}
        onChangeText={setCardholderName}
      />
      <Text style={styles.label}>Expiration Date (MM/YY)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the expiration date (MM/YY)"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />
      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the CVV"
        value={cvv}
        onChangeText={setCvv}
      />
      <Button title="Validate" onPress={handleValidate} />
      {!isValid && <Text style={styles.error}>Invalid credit card!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%'
  },
  error: {
    color: 'red',
    marginTop: 10
  }
});

