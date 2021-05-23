import React,{Fragment, useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {CarritoContext} from '../context/carritoContext'
import {listarCategorias} from '../Services/CategoriaService'
import LinkCategoria from '../Componentes/LinkCategoria'

export default function NavCliente() {
  const {carrito} = useContext(CarritoContext) 
  const [categoria, setCategoria] = useState([])
 

  const getCategoria = async()=>{
    let response = await listarCategorias() 
    //console.log(response);  
    setCategoria(response)
  }

  useEffect(()=>{
    getCategoria()
   
  },[])
  
 



  
  return (
    <Fragment>
      
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                <Link className="nav-link text-dark" to='/'>Cursos</Link>
                
                
                
                </li>                             
              </ul>         
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to='/ensena'>Enseña en Escuela Libre</Link>               
                </li>             
                
                  <li className="nav-item">
                  <Link className="nav-link text-dark" to='/login'>Iniciar Sesión</Link>
                  </li>
                <li className="nav-item navbar-brand">     
                  <div className="carrito">
                    <Link to="/carrito" ><i className="fas fa-shopping-cart carrito"></i>
                      <span id="cart_menu_num" data-action="cart-can" className="badge rounded-circle">
                      { carrito.length==0?"0":carrito.length}
                      </span>
                    </Link>
                  </div>       
                  
                  </li>              
              </ul>
                    
           
    </Fragment>
  )
}