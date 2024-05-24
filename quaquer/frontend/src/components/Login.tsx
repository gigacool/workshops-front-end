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
      <Button type="primary" htmlType="submit" disabled={!submittable} data-testid="submit-button">
        {children}
      </Button>
    );
  };


type FieldType = {
    username?: string;
    password?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (error) => {
    console.log('failure', error)
}

export const Login: React.FC = () => {
    const { login } = useAuth();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    username:form.getFieldValue('username'),
                    password:form.getFieldValue('password')
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const token = data.token;
            login(token); // Update the context with the new token
            navigate('/app'); // Redirect to the dashboard

        } catch (error) {
            throw new Error('Login failed');
        }
    }

    return (
        <div className={style.login}>
        
        <Form
            form={form}
            name="login"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
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

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                <SubmitButton form={form}>
                    Log in
                </SubmitButton>
            </Form.Item>
        </Form>
        <div>
            <p>Changed your mind ? get back to <Link to="/">home page</Link></p>
        </div>
        </div>
    )
}

export default Login;