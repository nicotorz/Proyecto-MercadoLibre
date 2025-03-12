import { useEffect, useState } from "react";
import InputComponent from "./inputComponent";
import api from '../../services/api';
import './ProductDescription.css'

const ProductDescription = ({bodyDescription, onInputChange}) => {

const [category,setCategory] = useState({id: '' , name:''})
const [categories,setCategories] = useState([])

useEffect(() => {
    api.allCategories()
        .then(response => {
            setCategories(response);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}, []);

const handleInputChange = (field, value) => {
    onInputChange(prevState => {
        if (field === 'shipping.price') {
            return {
                ...prevState,
                shipping: {
                    ...prevState.shipping,
                    price: value
                }
            }
        }
        else if(field === 'category'){
            return{
                ...prevState,
                category:{
                    ...prevState.category,
                    id: value.id,
                    name: value.name
                }
            }
        }
        return{
        ...prevState,
        [field]: value
        };
    });
}

const handleCategoryChange = (event) => { 
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

    const category = {id: selectedCategory.id, name: selectedCategory.name};
    handleInputChange('category', category);
    setCategory(category); 
};



return (
    <div className="description-block">
            <div className="izquierda">
            <InputComponent type={"text"}
                        name="Title" 
                        value={bodyDescription.title}
                        setValue={(value) => handleInputChange('title', value)}/>
            <InputComponent type={"text"}
                            name={"Description"} 
                            value={bodyDescription.description}
                            setValue={(value) => handleInputChange('description', value)}/>
            <InputComponent type={"number"}
                            name={"Precio"} 
                            value={bodyDescription.price}
                            setValue={(value) => handleInputChange('price', value)}/>
            </div>
            <div className="derecha">
            <InputComponent type={"number"}
                            name={"Stock"} 
                            value={bodyDescription.stock}
                            setValue={(value) => handleInputChange('stock', value)}/>
            <InputComponent type={"number"}
                            name={"Shipping Price"} 
                            value={bodyDescription.shipping.price}
                            setValue={(value) => handleInputChange('shipping.price', value)}/>

            <div className="categoryBlock">
                <label className="category-newproduct"> Category </label>
                <div className="select-container">
                <select className='cate-select' value={bodyDescription.category.id} onChange={handleCategoryChange}>
                    <option value=""> Seleccionar </option>
                    {categories.length > 0 ? (
                    categories.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name}
                    </option>
                    ))
                    ) : "Sin Categoria"}
                </select>
                <hr className="vertical-line" />
                </div>
            </div>
        </div>
    </div>
)

}

export default ProductDescription;