import React from "react";
import { Modal } from "antd";

interface UserModelProps {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const UserModel: React.FC<UserModelProps> = ({
  id,
  first_name,
  last_name,
  email,
  avatar,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title="User Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <img src={avatar} alt={`${first_name} ${last_name}`} style={{ width: "100px", borderRadius: "50%" }} />
      <h3>{first_name} {last_name}</h3>
      <p>Email: {email}</p>
      <p>ID: {id}</p>
    </Modal>
  );
};

export default UserModel;
