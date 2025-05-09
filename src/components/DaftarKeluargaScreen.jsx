import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import dataKeluarga from '../data/dataKeluarga.json'; 

const DaftarKeluargaScreen = ({ route }) => {
  const { namaKelurahan, namaKecamatan } = route.params || {};
  const keluargaDiKelurahan = dataKeluarga[namaKelurahan] || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Daftar keluarga berisiko di {namaKelurahan}, {namaKecamatan}
      </Text>

      <ScrollView horizontal>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.cellHeader}>No</Text>
            <Text style={styles.cellHeader}>Nama</Text>
            <Text style={styles.cellHeader}>Koordinat</Text>
            <Text style={styles.cellHeader}>Muda</Text>
            <Text style={styles.cellHeader}>Tua</Text>
            <Text style={styles.cellHeader}>Dekat</Text>
            <Text style={styles.cellHeader}>Banyak</Text>
            <Text style={styles.cellHeader}>Air</Text>
            <Text style={styles.cellHeader}>Sanitasi</Text>
            <Text style={styles.cellHeader}>Intervensi</Text>
          </View>

          {keluargaDiKelurahan.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item.nama}</Text>
              <Text style={styles.cell}>{item.koordinat}</Text>
              <Text style={styles.cell}>{item.muda ? '✓' : '-'}</Text>
              <Text style={styles.cell}>{item.tua ? '✓' : '-'}</Text>
              <Text style={styles.cell}>{item.dekat ? '✓' : '-'}</Text>
              <Text style={styles.cell}>{item.banyak ? '✓' : '-'}</Text>
              <Text style={styles.cell}>{item.air ? '✓' : '-'}</Text>
              <Text style={styles.cell}>{item.sanitasi ? '✓' : '-'}</Text>
              <Text style={styles.cell}>{item.intervensi}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cellHeader: {
    fontWeight: 'bold',
    width: 100,
    fontSize: 12,
    marginRight: 6,
  },
  cell: {
    width: 100,
    fontSize: 12,
    marginRight: 6,
  },
});

export default DaftarKeluargaScreen;
