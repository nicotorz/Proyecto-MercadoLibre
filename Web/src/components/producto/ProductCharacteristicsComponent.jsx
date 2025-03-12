import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "./ProductCaracteristics.css"

const ProductCharacteristics = ({characteristics, setCharacteristics}) => {

const [name,setClave] = useState('')
const [value,setValor] = useState('')

const addCharacteristict = () => {
  const characRedex = /^(width|heigth|depth)$/;
  const characValue =/^[0-9]+(\.[0-9]+)?$/
  if (name.trim() && value.trim() && characValue.test(value) && characRedex.test(name)) {
    setCharacteristics([...characteristics, {name, value}]);
    setClave('');
    setValor('');
  }else{
    toast.error('Los campos de "Clave" o "Valor" ingresados son invalidos.');
    return;
  }
};

const deleteCharacteristict = (index) => {
    setCharacteristics(characteristics.filter((_, i) => i !== index));
};

return (
  <>
    <ToastContainer position="bottom-right" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover />
    <div className="characteristics-block">
        <label className="caracteristicas"> Caracteristicas </label>
        <div className="block-charact"> 
            <input className= "input-carac"
                   type="text" 
                   placeholder="Clave"
                   value={name}
                   onChange = {(e) => setClave(e.target.value)}
            />
            <input className= "input-carac"
                   type="text" 
                   placeholder="Valor"
                   value={value}
                   onChange = {(e) => setValor(e.target.value)}
            />
            <button className="buton-add" onClick={addCharacteristict}> Agregar </button>
        </div>
        <div className="list-char">
        {characteristics.length > 0 ? (
          characteristics.map((item, index) => (
            <div className="list" key={index}>
              <span className="text">{item.name}: {item.value}</span>
              <button className="buton-delete"onClick={() => deleteCharacteristict(index)}> Delete </button>
            </div>
          ))
        ) : (
          <p className="texts-empty">No agregaste ninguna caracteristica</p>
        )}
        </div>
    </div>
  </>
)

}

export default ProductCharacteristics