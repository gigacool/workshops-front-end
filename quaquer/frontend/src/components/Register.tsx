import {useEffect, useState} from 'react';
import { Button, Form, Input, FormProps } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import { useAuth } from '../contexts/AuthContext';



import type { FormInstance } from 'antd';

import style from './Login.module.css';

interface SubmitButtonProps {
    form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = useState<boolean>(false);
  
    // Watch all values
    const values = Form.useWatch([], form);
  
    useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);
  
    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        {children}
      </Button>
    );
  };


type FieldType = {
    username?: string;
    password?: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (error) => {
    console.log('failure', error)
}

export const Register: React.FC = () => {
    const { login } = useAuth();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/users/register', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    username:form.getFieldValue('username'),
                    password:form.getFieldValue('password'),
                    firstName:form.getFieldValue('firstName'),
                    lastName:form.getFieldValue('lastName'),
                    birthDate:new Date(form.getFieldValue('birthDate')).getTime(),
                })
            });

            if (!response.ok) {
                throw new Error('Register failed');
            }

            const data = await response.json();
            const token = data.token;
            login(token); // Update the context with the new token
            navigate('/app'); // Redirect to the dashboard

        } catch (error) {
            throw new Error('Register failed');
        }
    }

    return (
        <div className={style.register}>
        
        <Form
            form={form}
            name="register"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleRegister}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
            
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="First name"
                name="firstName"
                rules={[{ required: true, message: 'Please provide first name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: 'Please provide last name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Last name"
                name="birthDate"
                rules={[{ required: false, message: 'Please provide a birth date' }]}
            >
                <Input type='date'/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                <SubmitButton form={form}>
                    Register account
                </SubmitButton>
            </Form.Item>
        </Form>
        <div>
            <p>Changed your mind ? get back to <Link to="/">home page</Link></p>
        </div>
        </div>
    )
}

export default Register;