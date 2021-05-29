import axios from 'axios'

//const URL ="https://601e0134be5f340017a1a122.mockapi.io/productos"

const listarCategorias = async()=>{
  try{
    let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/categoria/`)
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