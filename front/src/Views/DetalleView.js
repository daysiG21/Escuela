import React,{useState, useEffect,useContext, Fragment} from 'react'
import {buscarCursoId} from '../Services/CursoService'
import {CarritoContext} from '../context/carritoContext'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'

export default function DetalleView(props){
 let history = useHistory()
 const id = props.match.params.id

  const [curso, setCurso]=useState({})

  const {carrito, anadirCurso }= useContext(CarritoContext)

  const getCurso =async ()=>{
    let response = await buscarCursoId(id)
    setCurso(response)

  }

 
  const anadirCursoContext= ()=>{
    let cursoAlCarrito = {...curso,cantidad:1}
     anadirCurso(cursoAlCarrito)
     Swal.fire({ //alerta!
      icon:'success',
      title:'Curso Añadido!',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonColor:'#838689',
      confirmButtonText:'Seguir Comprando',
      denyButtonText:'Ir al carrito'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        history.push('/')
       
      }else if(resultado.isDenied){
      
        history.push('/carrito')
      }
    })
  }

  useEffect(()=>{
    getCurso()
  },[])

  const retornar = ()=>{
    history.push('/')
   }
  return (
    <Fragment>
      <div className="row"> 
        <div className="col-lg-12">
        <div className="cardDet">
        <div className="card_left"  style={{backgroundImage:`url(${curso.producto_imagen})` }}>
        </div>
        <div className="card_right">
          <h1>{curso.producto_nombre}</h1>
          <div className="card_right__details">
            
            <div className="card_right__review">            
              <p>{curso.producto_descripcion}</p>               
              <p>S/ {parseFloat(curso.producto_precio).toFixed(2)}</p>
            </div>
            
          </div>
          <div className="botones">
            <button className=" card_right__button mt-2"  onClick={()=>{anadirCursoContext()}}>Agregar al Carrito</button>
            <button className=" card_right__button mt-2 leftBoton" onClick={()=>{retornar()}} >Seguir comprando</button>
          </div>
        </div>
        </div>
        </div>
      </div>
      
    </Fragment>
    
  )
}