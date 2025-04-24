import React, { useState } from 'react'
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const App = () => {
  const [fileList, setFileList] = useState(null)
  const [form] = Form.useForm();
  const handleUpload = (info) => {
    setFileList(info.fileList)
  };

  const formData = new FormData();

  const handleSubmit = async(values) => {
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append(`password`, values.password);
    formData.append("image", fileList[0].originFileObj);
    try {
      let res = await axios.post(`http://localhost:5500/api/v1/user-upload`,formData,{
        headers : {
          "Content-Type" : `multipart/form-data`
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div >

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Profile Image"
          name="image"
          rules={[{ required: true, message: 'Please upload a profile image!' }]}
        >
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleUpload}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App