import axios from 'axios'

const listarCursos = async()=>{
  try{
    let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/curso/`)
    console.log(data)
    return data
  }
  catch(error){
    return error
  }
}

const buscarCursoId = async(id)=>{

  try{
    let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/curso/${id}/`)
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

      let {data} = await axios.post(`${process.env.REACT_APP_API_URL}/curso/`,objProducto,{headers})
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

      let {data} = await axios.put(`${process.env.REACT_APP_API_URL}/curso/${id}/`,objProducto,{headers})
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

      let {data} = await axios.post(`${process.env.REACT_APP_API_URL}/curso/`,objVenta,{headers})
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
    let {data} = await axios.delete(`${process.env.REACT_APP_API_URL}/curso/${id}/`, {headers})
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