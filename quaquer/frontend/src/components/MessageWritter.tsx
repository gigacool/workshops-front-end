import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { usePublishQuackMutation } from '../store/api';

interface MessageWritterProps {
}

const MessageWritter: React.FC<MessageWritterProps> = () => {
  const [form] = Form.useForm();

  const [publishQuack, publishQuackResult] = usePublishQuackMutation()


  useEffect(() => {
    if(publishQuackResult.isError){
      message.error('Failed to publish message');
    } else if(publishQuackResult.isSuccess){
      message.success('Message published successfully');
      form.resetFields();
    }
  }, [publishQuackResult]) 

  return (
    <Form 
        form={form} 
        onFinish={publishQuack}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ minWidth:480, maxWidth: 600 }}
    >
      <Form.Item
        name="content"
        rules={[{ required: true, message: 'Please enter your message!' }]}
      >
        <Input.TextArea rows={3} placeholder="Don't be shy, write your thoughts before sharing with the world" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Quack it!
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MessageWritter;
