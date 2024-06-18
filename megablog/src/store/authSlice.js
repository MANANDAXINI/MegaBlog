import {createSlice} from "react-redux"

const initialstate = {
    status:false,
    userdata:null
}

const authSlice = createSlice({
        name:"authData",
        initialstate,
        reducers:{
            login:(state,action)=>{
                state.status=true,
                state.userdata=action.payload.userdata
            },

            logout:(state)=>{
                state.status=false,
                state.userdata=null
            }
        }

})


export default authSlice;