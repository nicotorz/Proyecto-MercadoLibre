import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loginContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        paddingBottom: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loginForm: {
        width: '100%',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#3483FA',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
    },
    message: {
        marginTop: 15,
    },
    linkText: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

export default styles;
