import React,{useContext} from 'react'
import {CarritoContext} from '../context/carritoContext'
import TarjetaCarrito from '../Componentes/TarjetaCarrito'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {AuthFireContext} from '../context/authFireContext'
import axios from 'axios'

export default function CarritoView(){
  let precio  =0
  let history = useHistory()

 
  const {carrito,anadirCurso,removerCurso,limpiarCarrito} = useContext(CarritoContext)
  const {userId, setAuthUserId} = useContext(AuthFireContext)
 
  
  let totalCarrito = 0
  if(carrito.length > 1){
    for(let i =0; i<carrito.length; i++){
      totalCarrito = totalCarrito + parseFloat(carrito[i].cursoPrecio)
    }
    /*
    totalCarrito = carritoTmp.reduce(
      (total, prod) => parseInt(total.producto_precio) + parseInt(prod.producto_precio)
    )
    */
  }else if(carrito.length === 1){ // Si hay un solo objeto
    totalCarrito =parseFloat(carrito[0].cursoPrecio)
  }



  const pagar = async()=>{
   // history.push('http://google.com.pe')
   const config = {
        headers: {
            'Authorization':'Token '+ userId,
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({ carrito: carrito});
    console.log('carrito', carrito);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/pagos/`, body, config);
    console.log('response', res);

    window.location.href = res.data.url;

    /*
   limpiarCarrito()
   Swal.fire({
    icon: "success",
    title: "Gracias por su Compra",
    showConfirmButton:false,
    timer:1000
  }).then(() => {

    history.push('/')

  })
  */
    
  }
  return (
    <div>  
      {
        carrito.length===0?(
          <p>No hay cursos en el carrito</p>
        ):
        (
          <div className="row">
            <h5>Tiene {carrito.length}  {carrito.length <=1 ?  "curso" : "cursos"} en el carrito</h5>            
        
            
              <div className="col-sm-12 col-md-6 col-lg-8">
              { 
                carrito.map((item, i) => (
                  
                  // <div className="row" key={i}>
                  //   <div className="col-lx-6">        
                  //     <div className="card mb-3 mh-100">
                  //       <div className="row g-2">
                  //         <div className="col-md-4">              
                  //           <img src="https://agendaeducativa.org/wp-content/uploads/2020/08/Matem%C3%A1tica-P%C3%A1ginas-web-850x560.jpg" className="card-img-top" alt="..."/>
                  //         </div>
                  //         <div className="col-md-8 break-word">
                  //           <div className="card-body">
                  //             <h6 className="card-title">{item.producto_nombre}</h6>
                  //             <p className="card-text"><small className="text-muted">S/ {item.producto_precio}</small></p>
                  //             <p className="card-text">Profesor: {item.profesor}</p> 
                  //             <button className="btn btn-danger btn-sm" onClick={() => {removerCurso(i); }}>
                  //               <i className="fas fa-trash"></i>
                  //             </button>                            
                  //           </div>
                            
                  //         </div>
                          
                  //       </div>          
                  //     </div>      
                  //   </div>  
                  // </div> 
                  <TarjetaCarrito curso={item} key={i} pos={i}/>
                ))
              }              
              </div> 

              <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card carView mb-2">                
                  <div className="card-body">
                    <span>Total</span>
                    <h1>S/ { totalCarrito.toFixed(2)}</h1>
                  </div>
                
                  <div className="d-grid">
                    <button className="btn btn-success" onClick={()=>pagar()}>Comprar</button>
                  </div>
                
              </div>
              </div>
              
           
          </div>
          

        )
      }
    </div>
  )
}