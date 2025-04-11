import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [gender, setGender] = useState('Male');
  const [showGenderOptions, setShowGenderOptions] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama</Text>
        <TextInput style={styles.input} value="Timothy Manoppo" editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Jabatan</Text>
        <TextInput style={styles.input} value="Petugas SATGAS Stunting" editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Jenis Kelamin</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowGenderOptions(!showGenderOptions)}>
          <Text>{gender}</Text>
        </TouchableOpacity>
        {showGenderOptions && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => { setGender('Male'); setShowGenderOptions(false); }}>
              <Text style={styles.dropdownItem}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setGender('Female'); setShowGenderOptions(false); }}>
              <Text style={styles.dropdownItem}>Female</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nomor telefon</Text>
        <TextInput style={styles.input} value="0895-3750-12000" editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value="s22110621@student.unklab.ac.id" editable={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;