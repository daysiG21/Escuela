import axios from 'axios'

//const URL ="https://601e0134be5f340017a1a122.mockapi.io/productos"
const URL = "http://127.0.0.1:8000/categoria/"

const listarCategorias = async()=>{
  try{
    let {data} = await axios.get(URL)  
    //console.log(data) 
    return data
  }
  catch(error){
    return error
  }
}

export {
  listarCategorias
}