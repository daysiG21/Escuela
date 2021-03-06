import axios from 'axios'

// const URL ="https://601e0134be5f340017a1a122.mockapi.io/usuario"

const loginUsuario = async(data)=>{
  let {email, password} = data;
  //console.log(data);
  try{
    // console.log(`${process.env.REACT_APP_API_URL}`)
    let token = await axios.post(`${process.env.REACT_APP_API_URL}/auth/token/login/`, {'email': email, 'password': password})
    .then(
      res => {
         //console.log('response from django: ',res)
        let { auth_token } = res.data;
        // console.log('data', auth_token)
        return res.data
      }
    )
     //console.log(token)
    return token
  }
  catch (err){
    //console.log(err)
    return err
  }
}

//salir
const logoutFire = () => {
  return "";//fire.auth().signOut()
}

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
     
      let {data} = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`,JSON.stringify(objUsuario),{headers})
     
      return data
  }
  catch(error){
    return error
  }
}


export {
  loginUsuario,
  buscarUsuarioId,
  registrarUsuario,
  logoutFire
}