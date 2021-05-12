import axios from 'axios'

const URL ="https://601e0134be5f340017a1a122.mockapi.io/usuario"


const buscarUsuarioId = async(id)=>{

  try{
    let {data} = await axios.get(`${URL}/${id}`)
    return data;
  }
  catch(error){
    return error
  }
}


const registrarUsuario =async (objUsuario)=>{
  try{
      let headers = {
        "Content-Type":"application/json"
      }

      let {data} = await axios.post(URL,objUsuario,{headers})
      return data
  }
  catch(error){
    return error
  }
}


export {
  buscarUsuarioId,
  registrarUsuario
}