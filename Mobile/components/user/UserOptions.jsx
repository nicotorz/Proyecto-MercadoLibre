import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Stack, useRouter } from "expo-router";
const UserOptions = ({ text}) => {

    const route = useRouter();

    const handleOption = () => {
        route.push(`(tabs)/user/${text}`);
    }

    return (
        <View style={styles.options}>
            <Pressable  onPress={handleOption}> 
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    options:{
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 16,
        elevation: 2,
        left: 7,
        width: '97%'
        
    },
    text:{
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
    }
});

export default UserOptions;
