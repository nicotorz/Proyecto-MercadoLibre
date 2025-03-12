import Register from '../../../components/register/Register';
import { useContext, useEffect } from "react";
import { useNavigation } from "expo-router";
import { AuthContext } from "../../../hooks/authContext";
import UserProfile from '../../../components/user/UserProfile';

const RegisterScreen = () => { 

    const navigation = useNavigation();
    const {user} = useContext(AuthContext);

    useEffect(()  => {
        if(user){
            navigation.setOptions({ title: user.name });
        }   
    },[user]);
    
    return(
        <>
            {!user?
                <Register/>
                :
                <UserProfile/>
            }
        </>
    )
}

export default RegisterScreen;