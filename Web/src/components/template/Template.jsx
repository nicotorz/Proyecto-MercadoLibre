import {useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import './Template.css'
import api from '../../services/api';

const Template = ({children}) => {
const [user,setUser] = useState(null)

useEffect(() => {

    const token = localStorage.getItem('token');
    if (!!token) {
    api.getUser().then(user => {
        setUser(user)
    })
    }
},[])


    return(
        <div key={user}>  
            <NavBar userFound={user}/>
            {children}
        </div>
    );
};
export default Template