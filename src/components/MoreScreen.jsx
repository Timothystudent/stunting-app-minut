// src/screens/InformasiPage.jsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const indikatorData = [
  {
    title: 'Terlalu Muda',
    description: 'Menikah sebelum usia 18 tahun meningkatkan risiko stunting pada anak karena kesiapan fisik dan mental ibu yang belum optimal.',
    solutionMasyarakat: 'Menghindari pernikahan dini dan mengikuti edukasi tentang pernikahan sehat.',
    solutionPemerintah: 'Mengadakan pendampingan remaja, kampanye stop pernikahan dini, dan peningkatan akses pendidikan.',
  },
  {
    title: 'Terlalu Tua',
    description: 'Usia Ibu Melahirkan >35 Tahun. Risiko komplikasi kehamilan dan bayi lahir dengan berat badan rendah meningkat.',
    solutionMasyarakat: 'Melakukan pemeriksaan kehamilan rutin dan merencanakan kehamilan dengan bijak.',
    solutionPemerintah: 'Menyediakan layanan konsultasi kehamilan dan edukasi risiko kehamilan usia lanjut.',
  },
  {
    title: 'Terlalu Dekat',
    description: 'Jarak kelahiran yang kurang dari 2 tahun dapat mempengaruhi asupan nutrisi dan perhatian terhadap anak sebelumnya.',
    solutionMasyarakat: 'Mengatur jarak kehamilan dengan menggunakan alat kontrasepsi yang sesuai.',
    solutionPemerintah: 'Memperluas akses layanan Keluarga Berencana (KB) dan edukasi terkait manfaat pengaturan jarak kelahiran.',
  },
  {
    title: 'Terlalu Banyak',
    description: 'Semakin banyak anak, semakin terbagi perhatian dan sumber daya orang tua.',
    solutionMasyarakat: 'Merencanakan jumlah anak sesuai kemampuan ekonomi dan pengasuhan.',
    solutionPemerintah: 'Mengadakan penyuluhan keluarga berencana dan memberikan dukungan ekonomi bagi keluarga kurang mampu.',
  },
  {
    title: 'Akses Air Bersih Terbatas',
    description: 'Kurangnya air bersih menyebabkan penyakit diare yang berdampak pada gizi anak.',
    solutionMasyarakat: 'Menggunakan air bersih untuk konsumsi dan menjaga kebersihan lingkungan.',
    solutionPemerintah: 'Membangun dan memperluas infrastruktur air bersih di daerah yang membutuhkan.',
  },
  {
    title: 'Sanitasi Buruk',
    description: 'Lingkungan yang tidak bersih dapat menyebabkan infeksi dan gangguan pertumbuhan.',
    solutionMasyarakat: 'Membangun dan menggunakan toilet sehat serta menerapkan perilaku hidup bersih dan sehat (PHBS).',
    solutionPemerintah: 'Menyediakan bantuan pembangunan sanitasi dan pelatihan PHBS di masyarakat.',
  },
];


const MoreScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Indikator Keluarga Berisiko Stunting</Text>
      {indikatorData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          
          <Text style={styles.solutionTitle}>Solusi untuk Masyarakat:</Text>
          <Text style={styles.solution}>{item.solutionMasyarakat}</Text>
          
          <Text style={styles.solutionTitle}>Upaya Pemerintah:</Text>
          <Text style={styles.solution}>{item.solutionPemerintah}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f5f9ff',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  desc: { fontSize: 15, color: '#333', marginBottom: 10 },
  solutionTitle: {
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 8,
    marginBottom: 4,
  },
  solution: { fontSize: 14, color: '#555' },
});

export default MoreScreen;
