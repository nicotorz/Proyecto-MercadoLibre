import { Stack } from "expo-router"
import "react-native-reanimated";
import { useContext } from "react";
import { AuthContext } from "../../../hooks/authContext";
export default function UserLayout() {

    const {user} = useContext(AuthContext);
    return (
        <Stack>
            <Stack.Screen name="profile" 
            options={{ headerShown: user? true: false, 
                        headerStyle: {
                            backgroundColor: '#FFE600'
                        },
                        headerTintColor: '#333',
            }}
            />
            <Stack.Screen name="register" 
            options={{ headerShown:  user? true: false,  
                        headerStyle: {
                            backgroundColor: '#FFE600'
                        },
                        headerTintColor: '#333',
            }}
            />
            <Stack.Screen name="[id]" 
            options={{
                headerShown: true, 
                headerStyle: {
                    backgroundColor: '#FFE600'  
                },
                headerTintColor: '#333',
                cardStyle: { backgroundColor: '#E7E7E7' }
            }} 
            />            
        </Stack>
    )
}