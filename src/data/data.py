import pandas as pd

# Buka file Excel
file_path = "/content/data-keluarga-berisiko-stunting-minut.xlsx"  # ganti sesuai nama file
df = pd.read_excel(file_path)

# Daftar kolom faktor risiko
faktor_risiko = [
    'sumber_air_layak_tidak',
    'jamban_layak_tidak',
    'terlalu_muda',
    'terlalu_tua',
    'terlalu_dekat',
    'terlalu_banyak'
]

# Pastikan kolom faktor risiko bertipe numerik
for kolom in faktor_risiko:
    df[kolom] = pd.to_numeric(df[kolom], errors='coerce')

# Tandai apakah keluarga berisiko
df['berisiko'] = df[faktor_risiko].sum(axis=1) > 0

# Hitung total keluarga dan keluarga berisiko per kecamatan
hasil_per_kecamatan = df.groupby('namakecamatan').agg(
    total_keluarga=('berisiko', 'count'),
    jumlah_berisiko=('berisiko', 'sum')
)

# Hitung persentase keluarga berisiko
hasil_per_kecamatan['persentase_berisiko'] = (
    hasil_per_kecamatan['jumlah_berisiko'] / hasil_per_kecamatan['total_keluarga'] * 100
)

# Tampilkan hasil
print(hasil_per_kecamatan[['total_keluarga', 'jumlah_berisiko', 'persentase_berisiko']].round(2))
