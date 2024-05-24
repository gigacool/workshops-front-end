import React from 'react';
import { Form, Input, Button, message } from 'antd';

interface MessageWritterProps {
    token: string | null;
    onMessagePublished: () => void;
}

const MessageWritter: React.FC<MessageWritterProps> = ({ token, onMessagePublished }) => {
  const [form] = Form.useForm();

  const handlePublishMessage = async (values: { content: string }) => {
    try {
      const response = await fetch('/api/quacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to publish message');
      }

      message.success('Message published successfully');
      form.resetFields();
      onMessagePublished(); // Notify parent component to refresh the content
    } catch (error) {
      message.error('Failed to publish message');
    }
  };

  return (
    <Form 
        form={form} 
        onFinish={handlePublishMessage}
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
