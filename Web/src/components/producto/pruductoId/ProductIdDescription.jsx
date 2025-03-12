import './ProductIdDescription.css';

const ProductIdDescription = ({descriptionProduct}) => {

    return (

        <div className="productid-description-block">
            <h2 className="productid-title"> Descripcion </h2>
            <hr className="product-id-line"/>
            <div className="productid-description-info"> {descriptionProduct} </div>
        </div>

    );

};

export default ProductIdDescription