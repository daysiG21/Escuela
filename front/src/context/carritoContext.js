import React,{useState, createContext} from 'react'

export const CarritoContext = createContext();

const CarritoContextProvider = (props)=>{
  const [carrito, setCarrito] = useState([]);

  const anadirCurso = (curso) => { 
   
    for (let i = 0; i < carrito.length; i++) {
     
      if (carrito[i].cursoId === curso.cursoId) {        
        return; 
      }
    }

    setCarrito([...carrito, curso]);

  };


const removerCurso = (indice)=>{
  let carritoTemp =[...carrito]
  carritoTemp.splice(indice,1)
  setCarrito(carritoTemp)
};


const limpiarCarrito = () => { 
  setCarrito([]) 

}
  return (
    <CarritoContext.Provider
      value={{
        carrito,
        anadirCurso,
        removerCurso,
        limpiarCarrito
      }}
    >
      {props.children}
    </CarritoContext.Provider>
  )
}

export default CarritoContextProvider;