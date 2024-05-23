import {useEffect, useState} from 'react';
import { Button, Form, Input, FormProps } from 'antd';
import { Link } from 'react-router-dom';

import type { FormInstance } from 'antd';

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
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('success', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (error) => {
    console.log('failure', error)
}



export const Login: React.FC = () => {
    const [form] = Form.useForm();

    return (
        <>
        
        <Form
            form={form}
            name="login"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
        </>
    )
}

export default Login;