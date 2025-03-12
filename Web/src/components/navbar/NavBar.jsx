import React, { useState } from 'react'
import './NavBar.css'
import mercadoLibre_logo from '../../assets/mercadolibre.svg'
import search_icon from '../../assets/search-b.svg'
import { Link, useNavigate} from 'react-router-dom'; 
import cart from '../../assets/cart.svg'

const NavBar = ({userFound}) => {

  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?query=${text}`, { state: { user: userFound } });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='navbar'>
    
        <Link to="/"> 
            <img src={mercadoLibre_logo} alt='Mercado libre logo' className='navbar-logo'/> 
        </Link>

        <div className='search-box'>
            <input type="text" placeholder='Buscar productos, marcas y más...' 
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
            />
            <button className='btn' onClick={handleSearch}>
                <img src={search_icon} alt='Buscar' className='search-icon' />
            </button>    
        </div>

        <ul>
          <li>
            <Link to="/categories">Categorias</Link>
          </li>
          {userFound ? (
          <>
            <li>
              <Link to="/user">{userFound.name}</Link>
            </li>
            <li>
            <Link to="/cart">
              <img src={cart} alt='cart' className='cart-icon' />
            </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Crea tu cuenta</Link>
            </li>
            <li>
              <Link to="/login">Ingresá</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;