import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { getUsers } from "../features/Users/UsersSlice";
import { Table, Button, Space } from "antd";
import UserModel from "./UserModel";


interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.users);

  // State to track selected user and modal visibility
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (record: any) => {
    setSelectedUser(record); 
    setIsModalOpen(true); 
  };

  return (
    <>
      <Table
        dataSource={user}
        columns={[
          {
            title: "Profile",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar: string, record: any) => (
              <img src={avatar} alt={record.first_name} width={40} style={{ borderRadius: "50%" }} />
            ),
          },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "First Name", dataIndex: "first_name", key: "first_name" },
          { title: "Last Name", dataIndex: "last_name", key: "last_name" },
          {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
              <Space size="middle">
                <Button type="primary" size="small" onClick={() => handleEdit(record)}>
                  Edit
                </Button>
                <Button type="primary" danger size="small">
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Render the UserModel modal if a user is selected */}
      {selectedUser && (
        <UserModel
          id={selectedUser.id}
          first_name={selectedUser.first_name}
          last_name={selectedUser.last_name}
          email={selectedUser.email}
          avatar={selectedUser.avatar}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default UserList;
