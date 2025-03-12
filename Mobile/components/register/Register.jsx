import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Api from '../../services/api';
import registerStyle from './RegisterStyle';
import { router, useRouter } from 'expo-router';
import { AuthContext } from '../../hooks/authContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {setUser} = useContext(AuthContext);
  const route = useRouter();
  
  const handleRegister = () => {
    setErrorMessage(''); 

    Api.register(name, email, password, image)
      .then((response) => {
        setUser(response);
        router.navigate('/home');
      })
      .catch(error => {
        setErrorMessage(error.title || 'Ocurrió un error inesperado');
        Alert.alert('Error', error.title || 'Ocurrió un error inesperado');
      });
  };

  return (
    <View style={registerStyle.registerBody}>
      <View style={registerStyle.registerContainer}>
        <Text style={registerStyle.registerTitle}>Register</Text>
        <View style={registerStyle.formGroup}>
          <Text style={registerStyle.label}>Name</Text>
          <TextInput
            style={registerStyle.input}
            placeholder='Your Name'
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={registerStyle.formGroup}>
          <Text style={registerStyle.label}>Email</Text>
          <TextInput
            style={registerStyle.input}
            placeholder='Your Email'
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={registerStyle.formGroup}>
          <Text style={registerStyle.label}>Password</Text>
          <TextInput
            style={registerStyle.input}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={registerStyle.formGroup}>
          <Text style={registerStyle.label}>Image URL</Text>
          <TextInput
            style={registerStyle.input}
            placeholder='Image URL'
            value={image}
            onChangeText={setImage}
          />
        </View>
        <TouchableOpacity onPress={handleRegister} style={registerStyle.registerButton}>
          <Text style={registerStyle.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => route.navigate('(tabs)/user/profile')} style={registerStyle.loginLink}>
          <Text style={registerStyle.loginText}>Login</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={registerStyle.errorMessage}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
};

export default Register;