import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const Paylet = (props) => {


  return (
    <>
      <Button type="primary" onClick={props.showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
         
      </Modal>
    </>
  );
};

export default Paylet;