import { Stack } from "expo-router"
import "react-native-reanimated";
export default function CategoriesLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" 
            options={{ title: "Categories", headerShown: true, 
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
                tabBarStyle: { display: "none" } 
            }} 
            />
        </Stack>
    )
}