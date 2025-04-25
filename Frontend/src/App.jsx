import React, { useRef, useState,useEffect } from 'react'
import { Form, Input, Button, Upload,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const App = () => {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);



  const [fileList, setFileList] = useState(null)
  const [form] = Form.useForm();
  const handleUpload = (info) => {
    setFileList(info.fileList)
  };

  const formData = new FormData();

  const handleSubmit = async (values) => {
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append(`password`, values.password);
    formData.append("image", fileList[0].originFileObj);
    try {
      let res = await axios.post(`http://localhost:5500/api/v1/user-upload`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`
        }
      })
      console.log(res);
      if (res) {
        alert("Data upload successfully")
      }
    } catch (error) {
      console.log(error)
    }
  };

  console.log(hasMore)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/v1/all-user?page=${page}&limit=${15}`);
        setItems((prev) => [...prev, ...res.data.items]);
        setHasMore(page < res.data.totalPages);
        console.log(res)
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchItems();
  }, [page]);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore]);









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
      <div>
        <h1>All user</h1>

        <div className=' border border-red-600 h-48 overflow-y-scroll ' >
          <h1>Infinite Items</h1>
          {items.map((item, index) => (
            <div key={index} style={{ padding: 10, border: '1px solid #ddd' }}>
              <h3>{item.name}</h3>
              {/* <p>{item.description}</p> */}
            </div>
          ))}
          {hasMore && <div ref={loader}>Loading...</div>}
        </div>
      </div>
    </div>
  )
}

export default App