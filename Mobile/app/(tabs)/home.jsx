import Template from "../../components/template/Template";
import AllProduct from "../../components/producto/AllProduct";
import { View } from "react-native";
import {AuthProvider } from "@/hooks/authContext";
export default function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <Template tittle={"Latest update products"}>
          <AllProduct/> 
      </Template>
    </View>
  );
}


