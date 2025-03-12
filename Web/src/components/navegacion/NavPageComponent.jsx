import flechaSiguiente from '../../assets/flechaDer.svg'
import flechaAtras from '../../assets/flechaIzq.svg'
import './NavPage.css'


const NavPage = ({paginas, paginaActual, nuevaPagina}) =>{

const sigPagina = () => {
    nuevaPagina(paginaActual +1  > paginas ? paginas: paginaActual + 1);
  };

const atrasPagina = () =>{
  nuevaPagina(paginaActual <= 1? 1 : paginaActual - 1);
};
    return(
        <div className='navPage'>
              <div className='butonAtras'>
                <button className='btn' onClick={atrasPagina}> 
                    <img src= {flechaAtras} alt="atras"/>
                </button>
              </div>
              <div className='contador'>
                  <p>{paginaActual} de {paginas}</p>
              </div>
              <div className='butonSig'>
                <button className='btn' onClick={sigPagina}> 
                    <img src= {flechaSiguiente} alt="sig"/>
                </button>
              </div>
        </div>  
    )
};

export default NavPage;