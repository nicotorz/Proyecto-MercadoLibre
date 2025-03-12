import './ProductIdCharacteristics.css';

const ProductIdCharacteristic = ({characteristicProduct}) => {

return (    

    <div className="productid-characteristics-block">
        <h2 className="productid-title"> Caracteristicas del producto </h2>
        <hr className="product-id-line"/>
        <div className="productid-characteristics">
            {characteristicProduct.map((item, index) => (                
                <div className="characteristic-item" key={index}>
                  <span className="key-value">{item.name}: {item.value} </span>
                </div>
              ))
            }
        </div>
    </div>

);

};

export default ProductIdCharacteristic