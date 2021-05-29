import React,{useState, createContext} from 'react'

export const CarritoContext = createContext();

const CarritoContextProvider = (props)=>{
  const [carrito, setCarrito] = useState([]);

  const anadirCurso = (curso) => { 
    console.log(curso) 
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].cursoId === curso.cursoId) {
          return;
      }
    }
    // En caso no este lo agrega al contexto
    setCarrito([...carrito, curso]);

    let n_carrito = []
    let p_carrito = JSON.parse(localStorage.getItem('carrito'))

    if(p_carrito){ // Si ya hay objetos en el carrito
        n_carrito.push(...p_carrito);
        n_carrito.push(curso);
    } else { // si no hay carrito
        // crea un carrito
        n_carrito.push(curso);
    }
    //actualiza el carrito
    localStorage.setItem('carrito', JSON.stringify(n_carrito));

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