import React,{useState,useEffect} from 'react'
import Tarjeta from "./Tarjeta";
import {listarCursos} from '../Services/CursoService'
import { setGridPageStateUpdate } from '@material-ui/data-grid';
import Swal from 'sweetalert2'

export default function Tarjetas(){
  const [cursos, setCursos] = useState([])
  const [mostrar, setMostrar] = useState(0)
  let ultimaPagina =0
  const getCursos = async ()=>{
    let response = await listarCursos()
    //console.log(response)
    setCursos(response)
  }

  useEffect(()=>{
    getCursos()
  },[])

  const anterior = ()=>{
    if(mostrar===0){
      Swal.fire({
        title:'Primera página',
        icon:'info',
        showCancelButton:false,
        confirmButtonColor: '#ef9213;'
      })
    }
    else{
      setMostrar(mostrar - 8)
      ultimaPagina -= 8
    }   
   
  }

  const siguiente = ()=>{
      
    if(cursos.length - mostrar <= 8 ){
      Swal.fire({
        title:'Última página',
        icon:'info',
        showCancelButton:false,
        confirmButtonColor: '#ef9213;'
      })
    }
    else{
      setMostrar(mostrar + 8)
    }
  
  }
  return(
    <div className="row">
    
    
      {
        
        cursos.slice(mostrar, mostrar + 8).map((cur,i)=>(
        //  console.log(cur)
          <Tarjeta key={i} curso={cur}/>
        ))
      }
      <div className="col-12 d-flex justify-content-center my-3">
        
          <button className="btn btn-primary me-3" onClick={()=>{anterior()}}>
          Anterior
        </button>
        <button className="btn btn-primary ms-3" onClick={()=>{siguiente()}}>
        Siguiente
      </button>
        
      </div>
      
    </div>
  )
}