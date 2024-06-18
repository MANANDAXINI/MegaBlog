import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import{login,logout} from "./store/authSlice"


function App() {
  const[loading,setloading]=useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userdata)=>{
      if(userdata){
        dispatch(login({userdata}))
      }

      else{
        dispatch(logout)
      }
    })

    .finally(setloading)

  }, [])
  


 return 
}

export default App
