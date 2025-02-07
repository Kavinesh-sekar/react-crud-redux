import React from 'react';
import { Modal, Button } from 'antd';
import { ModalProps } from 'antd';

interface ConfirmModalProps{
    title:string;
    cancelName:string;
    confirmName:string;
    isModalOpen:boolean;
    setIsConfirmModalOpen :(open:boolean)=> void
    handleConfirm:()=> void

}


const ConfirmModal  : React.FC<ConfirmModalProps> = ({title,cancelName,confirmName,isModalOpen,setIsConfirmModalOpen,handleConfirm}) => {

    

    const handleCancel = () => {
        setIsConfirmModalOpen(false);
        console.log('cancel');

    }

return(
    <>

    <Modal 
    title= {title}
    open = {isModalOpen}
    footer={[
        <Button key="cancel" onClick={handleCancel}>
          {cancelName}
        </Button>,
        <Button key= "confirm" type="primary" danger onClick={handleConfirm}>
          {confirmName}
        </Button>,
      ]}

   
  >
    </Modal>

    {/* <h1>ConfirmModal</h1> */}
    </>
)   
}

export default ConfirmModal;

