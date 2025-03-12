import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Api from '../../services/api'
import styles from './LoginStyle';
import {AuthContext} from '../../hooks/authContext';
import { useRouter } from "expo-router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const route = useRouter();
    const {setUser} = useContext(AuthContext);

    const handleSubmit = async () => {
        setErrorMessage('');
        try {
            const user = await Api.login(email, password);
            route.navigate('/(tabs)/home');
            setUser(user);
        } catch (error) {
            setErrorMessage(error.title || 'Ocurrió un error inesperado');
        }
    };

    return (
        <View style={styles.loginBody}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Login</Text>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                <View style={styles.loginForm}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="email" 
                            value={email} 
                            onChangeText={setEmail} 
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="password" 
                            secureTextEntry 
                            value={password} 
                            onChangeText={setPassword} 
                        />
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.message}>
                    <TouchableOpacity onPress={() => route.navigate('user/register')}>
                        <Text style={styles.linkText}>Create new Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;
