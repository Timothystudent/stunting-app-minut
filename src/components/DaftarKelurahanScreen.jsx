import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import kelurahanData from '../data/kelurahan.json'; // pastikan path benar

const DaftarKelurahanScreen = ({ route }) => {
  const { kecamatan, role } = route.params; 
  const [kelurahanList, setKelurahanList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (kecamatan && kelurahanData[kecamatan]) {
      setKelurahanList(kelurahanData[kecamatan]);
    } else {
      setKelurahanList([]);
    }
  }, [kecamatan]);

  const handleKelurahanPress = (kelurahan) => {
    navigation.navigate('DaftarKeluargaScreen', {
      namaKelurahan: kelurahan,
      namaKecamatan: kecamatan,
      role: role, 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kelurahan di Kecamatan {kecamatan}</Text>

      {kelurahanList.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada data kelurahan untuk kecamatan ini.</Text>
      ) : (
        <FlatList
          data={kelurahanList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleKelurahanPress(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
  },
});

export default DaftarKelurahanScreen;
