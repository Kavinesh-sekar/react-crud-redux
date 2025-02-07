import axios from "axios";



export const fetchUsers = async() =>{
    const response = await axios.get('https://reqres.in/api/users?page=2');
    return response.data.data;
};

export const fetchLogin = async(username:string,password:string) =>{
    const response = await axios.post('https://reqres.in/api/login',{email:username,password:password});
    return response.data;
}

export const fetchCreateUser = async(user:any) =>{
    console.log('inside fetchCreateUser',user);
    const response = await axios.post('https://reqres.in/api/users',user);
    return response.data;
}

export const fetchUpdateUser = async(user:any) =>{
    const response = await axios.put(`https://reqres.in/api/users/${user.id}`,user);
    return response.data;
}

export const fetchDeleteUser = async(user:any) =>{
    console.log('inside fetchDeleteUser',user);
    const response = await axios.delete(`https://reqres.in/api/users/${user}`);
    console.log('inside fetchDeleteUser response',response);
    return user;
}



