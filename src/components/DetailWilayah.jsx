import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailWilayah = ({ route }) => {
  const { info } = route.params;
  const navigation = useNavigation();

  const handleKelurahanPress = () => {
       navigation.navigate('DaftarKelurahanScreen', {
      kecamatan: info.name,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Wilayah</Text>

      <Text style={styles.label}>ID:</Text>
      <Text style={styles.text}>{info.id}</Text>

      <Text style={styles.label}>Nama Wilayah:</Text>
      <Text style={styles.text}>{info.name || 'Tidak ada nama'}</Text>

      <Text style={styles.label}>Keterangan:</Text>
      <Text style={styles.text}>{info.keterangan || 'Tidak ada keterangan'}</Text>

      <Text style={styles.label}>Persentase Keluarga Berisiko:</Text>
      <Text style={styles.text}>
        {info.persentase != null ? `${parseFloat(info.persentase)}%` : 'Data tidak tersedia'}
      </Text>

      {/* Tombol Masuk ke Daftar Kelurahan */}
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
