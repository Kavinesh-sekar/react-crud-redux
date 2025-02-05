import axios from "axios";


export const fetchUsers = async() =>{
    const response = await axios.get('https://reqres.in/api/users?page=2');
    return response.data.data;
};

export const fetchLogin = async(username:string,password:string) =>{
    const response = await axios.post('https://reqres.in/api/login',{email:username,password:password});
    return response.data;
}