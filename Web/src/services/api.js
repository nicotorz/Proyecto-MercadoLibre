import axios from 'axios';

const getConfig = () => {
    return {headers: {'Authorization': localStorage.getItem('token')}}
}

const api_user = 'http://localhost:7070/user'; 
const api_login = 'http://localhost:7070/login';    
const api_register = 'http://localhost:7070/register';
const api_products = 'http://localhost:7070/products';
const api_search = 'http://localhost:7070/search';
const api_categories = 'http://localhost:7070/categories';
const api_purchase = 'http://localhost:7070/purchase';
const api_cart = 'http://localhost:7070/cart';

const allProduct = (pagina) => {
    return axios.get(`${api_products}?page=${pagina}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
};

const login = (email, password) => {
    return axios.post(`${api_login}`, {email: email, password: password})
        .then(response => {
            localStorage.setItem('token', response.headers['authorization']); 
    })
        .catch(error => {
            return Promise.reject(error.response.data);
    })
}

const getUser = () => {
    return axios.get(`${api_user}`, getConfig())
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if(error.response.status === 401) {
                console.log("Usted no está autorizado")
                return Promise.reject(error.response.data);
            }
        })
}

const getUserById = (id) => {
    return axios.get(`${api_user}/${id}`)
        .then((response) => {
            return (response.data);
        })
        .catch((error) => {
            console.error(error);

            
        })
}

const getUserProducts = (id, page) => {
    return axios.get(`${api_user}/${id}/products?page=${page}`)
        .then((response) => {
            return (response.data);
        })
        .catch((error) => {
            console.error(error);
        })
}

const register = (name, email, password, image) => {

    const body = {
        name: name,
        email: email,
        password: password,
        image: image,
    }

    return axios.post(`${api_register}`, body)
        .then((response) => {
            localStorage.setItem('token', response.headers['authorization']); 
        })
        .catch((error) => {
            console.log(error)
           return Promise.reject(error.response.data);
        })
}

const allCategories = () => {
    return axios.get(`${api_categories}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
            return [];
        })
}


const getProductsByCategory = (categoryId, page) => {
    return axios.get(`${api_categories}/${categoryId}?page=${page}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => { 
            console.error(error);
            return Promise.reject(error);
        });
};

const search = (texto) => {
    return axios.get(`${api_search}?query=${texto}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        })
}

const newProduct = (title, description, price, stock, shipping, category, images, characteristics) => {
    const body = {
        
        title: title,
        description: description,
        price: price,
        stock: stock,
        shipping: shipping, 
        category: category,
        images: images,
        characteristics: characteristics

    }

    return axios.post(`${api_products}`, body, getConfig())
        .then ((response) => {
            return response.data;
        })
        .catch((error) => {
            return Promise.reject(error.response.data);
        })

}

const editProduct = (id, title, description, price, stock, shipping, category, images, characteristics) => {
    
    const body = {
        
        title: title,
        description: description,
        price: price,
        stock: stock,
        shipping: shipping,
        category: category,
        images: images,
        characteristics: characteristics

    }

    return axios.put(`${api_products}/${id}`, body, getConfig())
        .then ((response) => {
        })
        .catch((error) => {
            return Promise.reject(error);
        })       

}

const getCart = () => {
    return axios.get(`${api_cart}`, getConfig())
        .then ((response) => {
            return response.data
        })
        .catch((error) => {
            if (error.response?.status === 401) {
            console.log('Usuario no autorizado, redirigiendo a login...');
        }});
}

const addToCart = async (cartData) => {

    return axios.put(`${api_cart}`, cartData, getConfig())
        .then((response) => {
            return response.data
        })
        .catch((error) =>{
            console.error('Error al agregar al carrito:', error);  
        return Promise.reject(error);
        });
}


const removeFromCart = async (id) => {
    return axios.delete(`${api_cart}/${id}`, getConfig())
        .then((response) =>{
            return response.data
        })
        .catch((error) =>{
            console.error('Error al eliminar producto del carrito:', error);
            return Promise.reject(error);
        })
};

const purchaseCart = async (paymentBody) => {
    return axios.post(`${api_purchase}`,paymentBody, getConfig())
        .then((response) =>{
            return response.data
        })
        .catch((error) =>{
            console.error('Error al realizar la compra:', error);
            return Promise.reject(error);
        })
};

const relatedProducts = (productId) => {
    return axios.get(`${api_products}/${productId}/related`)
        .then ((response) => {
            return response.data
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

const addQuestion = (productId, body) => {
    return axios.post(`${api_products}/${productId}/question`, body, getConfig())
        .then ((response) => {
            return response.data
        })
        .catch((error) => {
            return Promise.reject(error);
        })
};

const addAnswer = (productId, questionId, body) => {
    return axios.put(`${api_products}/${productId}/question/${questionId}`, {text: body}, getConfig())
        .then ((response) => {
            return response.data
        })
        .catch((error) => {
            return Promise.reject(error.response.data);
        })
};

const productId = (productId) => {

    return axios.get(`${api_products}/${productId}`)
        .then ((response) => {
            return response.data
        })
        .catch((error) => {
            return Promise.reject(error.response.data);
        })
};

const likedProduct = (id) =>{
    return axios.put(`${api_products}/${id}/like`,{} ,getConfig())
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return Promise.reject(error.response.data);
        })
}

const Api = {
    login,
    getUser,
    getUserById,
    getUserProducts,
    register,
    allProduct,
    newProduct,
    editProduct,
    allCategories,
    getProductsByCategory,
    search,
    getCart,
    addToCart,
    removeFromCart,
    purchaseCart,
    addAnswer,
    addQuestion,
    productId,
    relatedProducts,
    likedProduct
}

export default Api