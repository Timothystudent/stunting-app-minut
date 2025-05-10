import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'; 

const DetailWilayah = ({ route }) => {
  const { info } = route.params; 
  const navigation = useNavigation();
  const [wilayah, setWilayah] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await database()
          .ref('/features') 
          .once('value'); 

        const data = snapshot.val(); 
        if (data) {
          const foundWilayah = data.find(
            (feature) => feature?.properties?.id === info.id
          );
          setWilayah(foundWilayah?.properties || null); 
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [info.id]); 

  const handleKelurahanPress = () => {
    navigation.navigate('DaftarKelurahanScreen', {
      kecamatan: wilayah?.name || info.name, 
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Memuat data...</Text>
      </View>
    );
  }

  if (!wilayah) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Data wilayah tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Wilayah</Text>

      <Text style={styles.label}>ID:</Text>
      <Text style={styles.text}>{wilayah.id}</Text>

      <Text style={styles.label}>Nama Wilayah:</Text>
      <Text style={styles.text}>{wilayah.name || 'Tidak ada nama'}</Text>

      <Text style={styles.label}>Keterangan:</Text>
      <Text style={styles.text}>{wilayah.keterangan || 'Tidak ada keterangan'}</Text>

      <Text style={styles.label}>Persentase Keluarga Berisiko:</Text>
      <Text style={styles.text}>
        {wilayah.persentase != null ? `${parseFloat(wilayah.persentase)}%` : 'Data tidak tersedia'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleKelurahanPress}>
        <Text style={styles.buttonText}>Lihat Daftar Kelurahan</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#0047AB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DetailWilayah;