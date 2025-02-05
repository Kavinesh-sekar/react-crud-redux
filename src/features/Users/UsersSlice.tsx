import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers ,fetchLogin} from "./UsersAPI";

interface User{
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    avatar:string
    
}

interface UserState{
    user : User[],
    loading:boolean,
    error:string | null;
}

const initialState : UserState = {
    user:[],
    loading:false,
    error : null
}

interface LoginCredentials{
    username:string,
    password:string
}

export const getUsers = createAsyncThunk('users/getUsers', async()=>{
    return await fetchUsers();
})

export const getLogin  = createAsyncThunk('users/login',async(credentials:LoginCredentials)=>{
    return await fetchLogin(credentials.username,credentials.password);
})


const userSlice = createSlice({
    name:'users',
    initialState,
    reducers :{},
    extraReducers : (builder) =>{
        builder
        .addCase(getUsers.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "Something went wrong";
          })
          .addCase(getLogin.pending,(state)=>{
            state.loading = true;
          })
          .addCase(getLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
          })
    }
})

export default userSlice.reducer;