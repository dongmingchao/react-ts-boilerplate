import React, { useState, useCallback } from 'react';
import NoteBook from "../../components/notebook";
import { Link } from 'react-router-dom';
import css from './Home.css';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export default function Home() {
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div>
      <h1 className={css.header}>Home</h1>
      <NoteBook />
      <Button onClick={() => setVisible(true)}>弹框</Button>
      <Modal
        title="一个弹框弹出来了"
        visible={visible}
        footer={<>
          <Button onClick={handleClose}>确认</Button>
          <Button onClick={handleClose}>取消</Button>
          </>}>
        <p>弹框的内容</p>
      </Modal>
    </div>
  );
}
