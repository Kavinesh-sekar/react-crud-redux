import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../app/store"
import { deleteUser, getUsers } from "../features/Users/UsersSlice"
import { Table, Button, Space, Typography, Row, Col, Card, Input } from "antd"
import UserModel from "./UserModel"
import ConfirmModal from "./ConfirmModal"
import { message } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import styles from "../Styles/userList.module.css";
import { LoadingOutlined } from "@ant-design/icons";

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
}

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading } = useSelector((state: RootState) => state.users)
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmUserId, setConfirmUserId] = useState<number | null>(null)
  const [changeCardLayout, setChangeCardLayout] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    dispatch(getUsers())

  }, [dispatch])

  useEffect(() => {
    const filteredUsers = user.filter((user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredUsers(filteredUsers)
  }, [search, user])








  const handleEdit = (record: User) => {
    setSelectedUser(record)
    setIsModalOpen(true)
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleModalClose = (value: boolean) => {
    setIsModalOpen(value)
    if (!value) {
      setSelectedUser(null)
    }
  }

  const openConfirmModal = (id: number) => {
    setIsConfirmModalOpen(true)
    setConfirmUserId(id)
  }

  const handleConfirmDelete = async () => {
    if (confirmUserId) {
      await dispatch(deleteUser(confirmUserId)).unwrap()
      message.success("User deleted successfully")
      setIsConfirmModalOpen(false)
    }
  }



  return (
    
    
    
      <>      
      <Row justify="space-between" align="middle" className={styles.header}>
        <Typography.Title level={2}>User List</Typography.Title>


        <Input placeholder="Search" style={{ width: '300px' }} onChange={(e) => setSearch(e.target.value)}/>


        <Button type="primary" size="large" style={{ marginRight: '30px' }} onClick={handleCreateUser}>
          Create User
        </Button>
      </Row>

      <Row className={styles.container}>
        <Button type="primary" size="small" onClick={() => setChangeCardLayout(false)}>
          Table View
        </Button>
        <Button type="primary" size="small" onClick={() => setChangeCardLayout(true)}>
          Card View
        </Button>
      </Row>

 {loading ?(
      <LoadingOutlined   style={{ fontSize: '70px' , alignContent : 'center', justifyContent : 'center', display : 'flex', height : '100vh', width : '100vw'}} />
     ):( <>     

      {changeCardLayout ? (
        <Row gutter={[24, 24]}>
          {Array.isArray(user)
            ? filteredUsers.map((user) => (
                <Col key={user.id} xs={24} sm={12} md={8}>
                  <Card bordered={false} className={styles.userCard}>
                    <div className={styles.cardContent}>
                      <img src={user.avatar} alt={user.first_name} className={styles.avatar} />
                      <Typography.Title level={4} className={styles.userName}>
                        {`${user.first_name} ${user.last_name}`}
                      </Typography.Title>
                      <Typography.Text type="secondary">{user.email}</Typography.Text>
                    </div>
                    <div className={styles.cardActions}>
                      <Button
                        icon={<EditOutlined style={{ fontSize: '24px' }} />}
                        type="text"
                        onClick={() => handleEdit(user)}
                        className={styles.actionButton_edit}
                      />
                      <Button
                        icon={<DeleteOutlined style={{ fontSize: '24px' }} />}
                        type="text"
                        size="large"
                        danger
                        onClick={() => openConfirmModal(user.id)}
                        className={styles.actionButton_delete}
                      />
                    </div>
                  </Card>
                </Col>
              ))
            : []}
        </Row>
      ) : (
        <Table
          dataSource={Array.isArray(filteredUsers) ? filteredUsers : []}
          columns={[
            {
              title: "Profile",
              dataIndex: "avatar",
              key: "avatar",
              render: (avatar: string, record: any) => (
                <img src={avatar || "/placeholder.svg"} alt={record.first_name} className={styles.tableAvatar} />
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
                  <Button type="primary" danger size="small" onClick={() => openConfirmModal(record.id)}>
                    Delete
                  </Button>
                </Space>
              ),
            },
          ]}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
      </>
      )}

      <UserModel
        id={selectedUser?.id}
        first_name={selectedUser?.first_name}
        last_name={selectedUser?.last_name}
        email={selectedUser?.email}
        avatar={selectedUser?.avatar}
        isModalOpen={isModalOpen}
        setIsModalOpen={handleModalClose}
      />
      <ConfirmModal
        title="Are you sure you want to delete this user?"
        cancelName="Cancel"
        confirmName="Confirm"
        isModalOpen={isConfirmModalOpen}
        setIsConfirmModalOpen={setIsConfirmModalOpen}
        handleConfirm={handleConfirmDelete}
      />
   
    </>
  )
}

export default UserList

