import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelect = (selectedRole) => {
    if (selectedRole === 'masyarakat') {
      // Simpan role ke params saat navigate
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main', params: { role: selectedRole } }],
      });
    } else {
      setRole(selectedRole);
    }
  };

  const handleLogin = () => {
    if (email && password) {
      if (role === 'bkkbn' || role === 'admin') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main', params: { role } }],
        });
      }
    } else {
      alert('Email dan password harus diisi.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bkkbn.png')} style={styles.logo} />

      {!role ? (
        <>
          <Text style={styles.title}>Pilih Akses Masuk</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleRoleSelect('masyarakat')}>
            <Text style={styles.buttonText}>Masuk sebagai Masyarakat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleRoleSelect('bkkbn')}>
            <Text style={styles.buttonText}>Masuk sebagai BKKBN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleRoleSelect('admin')}>
            <Text style={styles.buttonText}>Masuk sebagai Admin</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Login sebagai {role.toUpperCase()}</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setRole(null)}>
            <Text style={styles.signup}>Kembali ke pemilihan peran</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0047AB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signup: {
    textAlign: 'center',
    color: '#0047AB',
    marginTop: 12,
  },
});

export default LoginScreen;
