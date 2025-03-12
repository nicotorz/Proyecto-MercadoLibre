import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api_base_url = 'http://{tu ip aqui}:7070'; //Cambiar por la ip de tu pc

const getConfig = async () => {
    const token = await AsyncStorage.getItem('token');
    return {
        headers: {
            'Authorization': token,
        },
    };
};

const api_endpoints = {
    user: `${api_base_url}/user`,
    login: `${api_base_url}/login`,
    register: `${api_base_url}/register`,
    products: `${api_base_url}/products`,
    categories: `${api_base_url}/categories`,
    search: `${api_base_url}/search`, 
    cart: `${api_base_url}/cart`,
    purchase: `${api_base_url}/purchase`
};

const allProduct = async (pagina) => {
    try{
        const response = await axios.get(`${api_endpoints.products}?page=${pagina}`)
        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
};
const login = async (email, password) => {
    try {
        const response = await axios.post(api_endpoints.login, { email, password });
        await AsyncStorage.setItem('token', response.headers['authorization']);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
};

const getUser = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(api_endpoints.user, config);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
};
const likeProduct = async (id) => {
    try{
        const config = await getConfig();
        const response = await axios.put(`${api_endpoints.products}/${id}/like`,{}, config);
        return response.data;
    }
    catch(error){
        return Promise.reject(error);
    }

};

const register = async (name, email, password, image) => {
    const body = { name, email, password, image };
    try {
        const response = await axios.post(api_endpoints.register, body);
        await AsyncStorage.setItem('token', response.headers['authorization']);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
};


const getCategories = () => {
    return axios.get(api_endpoints.categories)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
            return [];
        })
}

const search = (texto) => {
    return axios.get(`${api_endpoints.search}?query=${texto}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        })
}

const getProductsByCategory = (categoryId, page) => {
    return axios.get(`${api_endpoints.categories}/${categoryId}?page=${page}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => { 
            console.error(error);
            return Promise.reject(error);
        });
};



const getCart = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(api_endpoints.cart, config);
        return response.data;
    } catch (error) {
       
        return Promise.reject(error.response?.data || error);
    }
};


const addToCart = async (cartData) => {
    try {
        const config = await getConfig();
        const response = await axios.put(api_endpoints.cart, cartData, config);
        return response.data;
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        return Promise.reject(error);
    }
};


const removeFromCart = async (id) => {
    try {
        const config = await getConfig();
        const response = await axios.delete(`${api_endpoints.cart}/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        return Promise.reject(error);
    }
};


const purchaseCart = async (paymentBody) => {
    try {
        const config = await getConfig();
        const response = await axios.post(api_endpoints.purchase, paymentBody, config);
        return response.data;
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        return Promise.reject(error);
    }
};

const productId = async (productID) => {
    try {
        const response = await axios.get(`${api_endpoints.products}/${productID}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
};

const relatedProducts = async (id) => {
    try {
        const response = await axios.get(`${api_endpoints.products}/${id}/related`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

const addQuestion = async (productID, body) => {
    try {
        const config = await getConfig();
        const response = await axios.post(`${api_endpoints.products}/${productID}/question`, body, config)
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error);
    }
}

const addAnswer = async (productID, questionID, body) => {
    try {
        const config = await getConfig();
        const response = await axios.put(`${api_endpoints.products}/${productID}/question/${questionID}`, body, config)
        return response.data;
        } catch (error) {
            return Promise.reject(error.response?.data || error);
        }
    }



const Api = {
    login,
    getUser,
    register,
    getCategories,
    search,
    getProductsByCategory,
    allProduct,
    likeProduct,
    allProduct,
    getCart,
    addToCart,
    removeFromCart,
    purchaseCart,
    productId,
    relatedProducts,
    addAnswer,
    addQuestion
};

export default Api;
