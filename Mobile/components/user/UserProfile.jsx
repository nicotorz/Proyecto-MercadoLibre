import { useContext} from "react";
import { View, Pressable, Text, StyleSheet} from "react-native";
import { AuthContext } from "../../hooks/authContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserOptions from "./UserOptions";
import { useRouter } from "expo-router";

const UserProfile = () => {
    const {setUser} = useContext(AuthContext);
    const router = useRouter();

    const handleLogot = async () => {
        setUser(null);
        await AsyncStorage.removeItem('token');
        router.navigate('/user/profile');
    }
    return(
        <View style={styles.container}>
            <UserOptions text= {"Liked"} />
            <UserOptions text= {"Sales"}/>
            <UserOptions text= {"Purchases"}/>
            <UserOptions text= {"My products"}/>
            <View style={styles.containerLogOut}>
                <Pressable style={styles.logOut} onPress={handleLogot}>
                    <Text style={styles.text}>LogOut</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor :"#f0f0f0",
        width:410,
        height: 632,
        flex: 1
    },
    containerLogOut:{
        height:80,
        width:393,
        marginTop: 'auto',
    },
    logOut:{
        backgroundColor:"#3483fa",
        borderRadius: 8,
        paddingVertical: 16,
        left: 10,
        
    },
    text:{
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
        color: 'white'
    }
})
export default UserProfile;