import axios from 'axios'

const URL ="https://601e0134be5f340017a1a122.mockapi.io/profesor"


const registrarPostulante =async (objPostulante)=>{
  try{
      let headers = {
        "Content-Type":"application/json"
      }

      let {data} = await axios.post(URL,objPostulante,{headers})
      return data
  }
  catch(error){
    return error
  }
}



export {
  registrarPostulante 

}