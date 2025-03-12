import { View, TextInput, Text,  TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native"
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "@/hooks/authContext";
import Api from "../../services/api";
import Producto from "../../components/producto/Producto"
import Template from "../../components/template/Template";
import searchImage from "../../assets/images/search.png"
import searchStyles from '../../components/search/SearchStyle';


export default function SearchScreen() {
  const [texto, setTexto] = useState('');
  const [productsFound, setProductsFound] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const [productsLiked, setProductsLiked] = useState(user? user.likedProducts: []);

  const handleSearch = () => {
      Api.search(texto)
          .then((response) => {
              setProductsFound(response.products);
          })
          .catch((error) => {
              console.error(error);
          })
          .finally(() => {
              setIsLoading(false);
          });
  };

  const handleInputChange = (text) => {
      setTexto(text);
  };

  return (
      <Template tittle={"Search"}>
          <View style={searchStyles.container}>
              <View style={searchStyles.searchContainer}>
                  <TextInput
                      style={searchStyles.input}
                      onChangeText={handleInputChange}
                      value={texto}
                      placeholder="Buscar productos, marcas y más..."
                      placeholderTextColor="gray"
                  />
                  <TouchableOpacity style={searchStyles.searchButton} onPress={handleSearch}>
                      <FontAwesome name="search" size={24} color="grey" />
                  </TouchableOpacity>
              </View>
              
              {isLoading ? (
                  <ActivityIndicator size="large" color="#00000" />
              ) : (
                  productsFound.length === 0 ? (
                      <View style={searchStyles.noResultsContainer}>
                          <Image source={searchImage} style={searchStyles.noResultsImage} />
                          <Text style={searchStyles.noResultsText}>No results found</Text>
                      </View>
                  ) : (
                      <FlatList
                          data={productsFound}
                          renderItem={({ item }) => (
                              <View style={searchStyles.product}>
                              <Producto
                                  id={item.id}
                                  productLogo={item.images[0]}
                                  descriptionProduct={item.tittle}
                                  owner={item.owner}
                                  precio={item.price}
                                  productsLiked={productsLiked}
                                  setProductLiked={setProductsLiked}
                                  isLogged={user}
                              />
                              </View>
                          )}
                          keyExtractor={(item) => `${item.id}-search`}
                          numColumns={2}
                          contentContainerStyle={searchStyles.grid}
                          showsVerticalScrollIndicator={false}
                      />
                  )
              )}
          </View>
      </Template>
  );


};