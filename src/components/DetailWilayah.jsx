import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import geoData from '../data/geoData.json';

const DetailWilayah = ({ route }) => {
  const { id } = route.params;

  const wilayah = geoData.features.find(
    (feature) => feature.properties.id === id
  );

  if (!wilayah) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Data wilayah tidak ditemukan.</Text>
      </View>
    );
  }

  const { name, keterangan, persentase } = wilayah.properties;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Wilayah</Text>

      <Text style={styles.label}>ID:</Text>
      <Text style={styles.text}>{id}</Text>

      <Text style={styles.label}>Nama Wilayah:</Text>
      <Text style={styles.text}>{name}</Text>

      <Text style={styles.label}>Keterangan:</Text>
      <Text style={styles.text}>{keterangan || "Tidak ada keterangan."}</Text>

      <Text style={styles.label}>Persentase Keluarga Berisiko:</Text>
      <Text style={styles.text}>
        {persentase != null ? `${persentase}%` : "Data tidak tersedia"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
});

export default DetailWilayah;
