import React, { useState, useEffect } from "react";
import { Modal, Input, Row, message } from "antd";
import { useDispatch } from 'react-redux';
// import { createUser, updateUser } from '../redux/slices/userSlice';
import { AppDispatch } from '../app/store';
import { updateUser, createUser } from '../features/Users/UsersSlice'; 
interface UserModelProps {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  avatar: ''
};

const UserModel: React.FC<UserModelProps> = ({
  id,
  first_name = '',
  last_name = '',
  email = '',
  avatar = '',
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isModalOpen) {
      if (id) {
        setFormData({
          first_name: first_name || '',
          last_name: last_name || '',
          email: email || '',
          avatar: avatar || ''
        });
      } else {
        
        setFormData(initialFormState);
      }
    }
  }, [isModalOpen, id, first_name, last_name, email, avatar]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {

    if(!formData.first_name || !formData.last_name || !formData.email || !formData.avatar){
      message.error('Please fill all fields');
      return;
    }


    try {
      if (id) {
        await dispatch(updateUser({ ...formData, id })).unwrap();
        message.success('User updated successfully');
      } else {
        await dispatch(createUser(formData)).unwrap();
        message.success('User created successfully');
      }
      handleCancel();
    } catch (error) {
      message.error('Failed to save user');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState); 
    setIsModalOpen(false);
  };

  return (
    <Modal 
      title={id ? "Edit User" : "Create User"} 
      open={isModalOpen} 
      onOk={handleSubmit} 
      onCancel={handleCancel}
    >
      <Row style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Input
          name="first_name"
          type="text"
          style={{ width: "100%" }}
          required
          size="large"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <Input
          name="last_name"
          type="text"
          style={{ width: "100%" }}
          required
          size="large"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          type="email"
          style={{ width: "100%" }}
          size="large"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          name="avatar"
          type="text"
          style={{ width: "100%" }}
          size="large"
          placeholder="Image Url"
          value={formData.avatar}
          onChange={handleInputChange}
        />
      </Row>
    </Modal>
  );
};

export default UserModel;
