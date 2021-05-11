import fire from '../config/Firebase'

//registrar
const registroFire = (email,password) => {
  return fire.auth().createUserWithEmailAndPassword(email, password) 
}

//ingresar
const loginFire = (usuario) => {
  return fire.auth().signInWithEmailAndPassword(usuario.email, usuario.password)
}

//salir
const logoutFire = () => {
  return fire.auth().signOut()
}

export {
  registroFire,
  loginFire,
  logoutFire
}