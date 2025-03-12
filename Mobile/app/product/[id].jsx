import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, FlatList} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useNavigation } from "expo-router"
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/hooks/authContext';
import Api from "../../services/api";
import Producto from '../../components/producto/Producto';
import QuestionComponent from "../../components/producto/QuestionComponent"
import Toast from 'react-native-toast-message';
import Loading from '../../components/loading/Loading';

const ProductId = () => {
  const {user} = useContext(AuthContext);
  const { id, productName } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [actualImage, setActualImage] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productQuestions, setProductQuestions] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [likedProducts, setLikedProducts] = useState(user? user.likedProducts: []);
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({ title: productName, headerStyle:{backgroundColor:'#FFE600' }, headerTintColor: '#333'});
}, [productName]);
  useEffect(() => {
    Api.productId(id).then(response => {
      setProduct(response);
      setActualImage(response.images[0]);
      setProductQuestions(response.question);
      setIsOwner(user? response.owner.id === user.id: false);
    }).catch(error => {
        console.log(error);
    });
    Api.relatedProducts(id).then(response => {
        setRelatedProducts(response);
    }).catch(error => {
        console.log(error);
    });
    
},[id]);  

  const handleImageClick = (image) => {
    setActualImage(image);
  };

  const handlePurchase = () => {
    if(!user){
        Toast.show({
            type: 'error',
            text1: 'Tenes que iniciar sesion para agregar productos!',
            position: 'top',
            autoHide: true,
            visibilityTime: 3000
          });
    }else{
        Api.addToCart({productId: id, amount: selectedAmount})
        .then(() => {
            Toast.show({
                type: 'success',
                text1: 'Producto agregado con exito!',
                position: 'top',
                autoHide: true,
                visibilityTime: 3000
            });
        }).catch(error => {
            console.log(error);
        });
    }
}

  return (
      <>
    {product && productQuestions ? 
      <ScrollView style={styles.container}>
          <View>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productAuthor}>Por {product.owner.name}</Text>
          </View>

          <Image source={{ uri: actualImage }} style={styles.mainImage}/>
          <View style={styles.thumbnailContainer}>
          {product.images.length > 0 ? (
            product.images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
                <Image
                  source={{ uri: image }}
                  style={[
                    styles.thumbnail,
                    actualImage === image && styles.selectedThumbnail,
                  ]}
                  onError={({ nativeEvent }) =>
                    (nativeEvent.target.src = defaultImage)
                  }
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noImagesText}>No hay imágenes disponibles</Text>
          )}
          </View>

          <View style={styles.productPriceContainer}>
              <Text style={styles.productPrice}>${(product.price).toFixed(2)}</Text>
              <Text style={styles.productInstallments}>En 12 cuotas de ${(product.price/12).toFixed(2)}</Text>
          </View>

          <View style={styles.shippingContainer}>
              <Text style={styles.shipping}>Shipping: ${(product.shipping.price).toFixed(2)}</Text>
          </View>

          <View style={styles.productStockContainer}>
              <Picker selectedValue={selectedAmount}
                      style={styles.picker}
                      onValueChange={(itemValue) => setSelectedAmount(itemValue)} >
                {Array.from({ length: product.stock }, (_, index) => index + 1).map((value) => (
                  <Picker.Item key={value} label={`Amount: ${value} unit`} value={value} />
                ))}
              </Picker>
          </View>

          <View style={styles.containerButton}>
              <Pressable style={styles.addToCartButton} onPress={handlePurchase}>
                  <Text style={styles.addToCartText}> Add to cart </Text>
              </Pressable>
          </View>

          <View style={styles.characteristicsContainer}>
              <Text style={styles.characteristicsTitle}>Characteristics</Text>
              {product.characteristics.map((char, index) => (
                  <Text key={index}>{char.name}: {char.value}</Text>
              ))}
          </View>

          <View style={styles.description}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text>{product.description}</Text>
          </View>

          <View >
            <Text style={styles.sectionTitle}>Related Products</Text>
          </View>
          <View style={styles.productsGrid}>
            {relatedProducts.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.productContainer} >
                  <Producto
                    descriptionProduct={item.title}
                    id={item.id}
                    isLogged={user}
                    owner={item.owner}
                    precio={item.price}
                    productLogo={item.images[0]}
                    productsLiked={likedProducts}
                    setProductLiked={setLikedProducts}
                  />
              </View>
            ))}
          </View>
          <QuestionComponent questions = {productQuestions}
                            onChangeQuestions = {setProductQuestions}
                            isOwner= {isOwner}
                            user= {user}/>
      </ScrollView>
    : <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#fff',
    flex: 1,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productAuthor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedThumbnail: {
    borderColor: '#007BFF',
    borderWidth: 2,
  },
  productPriceContainer: {
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productInstallments: {
    fontSize: 16,
    color: '#007BFF',
  },
  shippingContainer: {
    marginBottom: 16,
  },
  shipping: {
    fontSize: 16,
  },
  productStockContainer: {
    marginBottom: 16,
    
  },
  picker: {
    borderRadius: 10,
    backgroundColor: '#E7E7E7',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  containerButton: {
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  characteristicsContainer: {
    marginBottom: 16,
  },
  characteristicsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productsGrid: {
      flexDirection: 'row', 
      flexWrap: 'wrap',
      width: '100%', 
    
  },
  productContainer: {
    width: '50%',
  },
  
  
});

export default ProductId;