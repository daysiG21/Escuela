import axios from 'axios'

//const URL ="https://601e0134be5f340017a1a122.mockapi.io/productos"
const URL = "http://127.0.0.1:8000/curso/curso"

const listarCursos = async()=>{
  try{
    let {data} = await axios.get(URL)  
    //console.log(data) 
    return data
  }
  catch(error){
    return error
  }
}

const buscarCursoId = async(id)=>{

  try{
    let {data} = await axios.get(`${URL}/${id}`)
    return data;
  }
  catch(error){
    return error
  }
}

const registrarCurso =async (objProducto)=>{
  try{
      let headers = {
        "Content-Type":"application/json"
      }

      let {data} = await axios.post(URL,objProducto,{headers})
      return data
  }
  catch(error){
    return error
  }
}

const editarCurso =async (objProducto,id)=>{
  try{
      let headers ={
        "Content-Type":"application/json"
      }

      let {data} = await axios.put(`${URL}/${id}`,objProducto,{headers})
      return data

  }
  catch(error){
    return error
  }
}

const registrarVenta =async (objVenta)=>{
  try{
      let headers ={
        "Content-Type":"application/json"
      }

      let {data} = await axios.post(URL,objVenta,{headers})
      return data
  }
  catch(error){
    return error
  }
}

const subirArchivo = (imagen, refStorage) => {
  return new Promise((resolve, reject) => {
    const tarea = refStorage.put(imagen)

    tarea.on(
      'state_changed',
      () => {},
      (error) => {reject(error)},
      () => { 
        tarea.snapshot.ref.getDownloadURL()
        .then(urlImagen => resolve(urlImagen))
      }
    )
  })
}

const eliminarProducto = async (id) => {
  try {
    let headers = {
      "Content-Type":"application/json"
    }
    let {data} = await axios.delete(`${URL}/${id}`, {headers})
    return data
  } catch (error) {
    return error
  }
}

export {
  listarCursos,
  buscarCursoId,
  registrarCurso,
  editarCurso,
  subirArchivo,
  eliminarProducto
}