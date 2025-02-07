import React, { useEffect ,useState} from 'react';
import { Card, Space, Row, Col, Input, Button, message, Alert   } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState <string>('');
    const [password, setPassword] = useState <string>('');
    const [error, setError] = useState <string>('');

    const handleLogin = async() => {
        const response = await fetch('https://reqres.in/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,password})

        });
        const data = await response.json();
        console.log(data);

        if(data.token){
            localStorage.setItem('token',data.token);
            navigate('/dashboard');
        }
        else{
            setError(data.error);   
        }
    }   

   


    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' ,backgroundColor:'#f0f2f5'}}>
            <Col>
                {error && <Alert message={error} type="error" />}
                <Card title="Login"  style={{ width: 400 }}  headStyle={{ textAlign: 'center' }}  >
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Input 
                            size="large" 
                            placeholder="Username" 
                            prefix={<UserOutlined />} 
                            value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input.Password 
                            size="large"
                            placeholder="Password" 
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="primary" block onClick={handleLogin}>
                            Login
                        </Button>
                    </Space>
                </Card>
            </Col>

            {/* <UserList />
            <UserUpdate /> */}
        </Row>


   
    )
}

export default Login;