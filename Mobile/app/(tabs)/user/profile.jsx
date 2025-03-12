import { useContext, useEffect} from "react";
import { useNavigation } from "expo-router";
import { AuthContext } from "../../../hooks/authContext";
import Login from "../../../components/login/Login";
import UserProfile from "../../../components/user/UserProfile";

export default function UserProfileScreen() {
    
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
            <Login/>
            :
            <UserProfile/>
        }
        </>
    )
}
