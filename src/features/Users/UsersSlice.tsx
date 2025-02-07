import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers ,fetchLogin, fetchUpdateUser, fetchCreateUser, fetchDeleteUser} from "./UsersAPI";

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

export const createUser = createAsyncThunk('users/createUser',async(user:any)=>{
    return await fetchCreateUser(user);
})

export const updateUser = createAsyncThunk('users/updateUser',async(user:any)=>{
    console.log('dddddddddddd',user);
    return await fetchUpdateUser(user);
})

export const deleteUser = createAsyncThunk('users/deleteUser',async(user:any)=>{
    console.log('inside deleteUser',user);
    return await fetchDeleteUser(user);
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
            console.log('inside getUsers action',action.payload);
            console.log('inside getUsers state',state);
            console.log('inside getUsers action',action);
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
          .addCase(createUser.pending,(state)=>{
            state.loading = true;
          })
          .addCase(createUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user.push(action.payload);
          })
          .addCase(updateUser.pending,(state)=>{
            state.loading = true;
          })
          .addCase(updateUser.fulfilled,(state,action)=>{
            console.log('inside updateUser',action.payload);
            // console.log('inside state',state.user);
            console.log("inside state", JSON.stringify(state.user, null, 2));

            const index = state.user.findIndex((u) => u.id === action.payload.id);

            if (index !== -1) {
            
                state.user[index] = action.payload;


            }
            console.log('inside index',index);

            console.log('inside action',action);
            state.loading = false;


          })
          .addCase(updateUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message ?? "Something went wrong";
          })
          .addCase(createUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message ?? "Something went wrong";
          })
          .addCase(deleteUser.pending,(state)=>{
            state.loading = true;
          })
          .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false;
            console.log('inside deleteUser', action.payload);
          
            const data = state.user.filter((user: User) => user.id !== action.payload);
            console.log('inside deleteUser aaaa',data);
            state.user = data;
          })
          .addCase(deleteUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message ?? "Something went wrong";
          })
    }   
})

export default userSlice.reducer;