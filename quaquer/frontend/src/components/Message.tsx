import React from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';

import { Link } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons'

interface IQuack {
    key: string,
    createdAt:string,
    likes: number,
    content: string,
    author: string
}

const cardStyle: React.CSSProperties = {
    width: 400,
    margin: '30px auto 0px auto'
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 60,
    height: 60,
    marginTop: 10
};

const Quack: React.FC<{ quack: IQuack, isAuthenticated:boolean, onLike?:(key:string)=>{} }> = ({ quack, isAuthenticated, onLike }) => {
    return (
        <Card data-testid={`quack-${quack.key}`} hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
            <Flex justify="left">
                <img
                    alt="avatar"
                    src="/robot-avatar.jpg"
                    style={imgStyle}
                />
                <Flex vertical align="flex-start" style={{ padding: 10 }}>
                    
                    <Typography.Title level={5} style={{ marginTop: 10 }}>
                        {quack.author}
                    </Typography.Title>

                    <Typography.Text >
                        {quack.content}
                    </Typography.Text>

       
                </Flex>
               
            </Flex>
            <Flex justify="right" align="flex-end"  style={{ padding: 0 }}>
                <Button type="text" disabled={!isAuthenticated} onClick={()=>{onLike(quack.key)}}><HeartTwoTone /> {quack.likes}</Button>
            </Flex>
        </Card>
    )
}

const Messages: React.FC<{ data: IQuack[], isAuthenticated:boolean, onLike:(key:string)=>{} }> = ({ data, isAuthenticated, onLike }) => (
    <div style={{marginTop:60}} >
        {data
            .filter((_quack, index) => (isAuthenticated ? true:index < 3))
            .map((quack) => (<Quack key={quack.key} quack={quack} isAuthenticated={isAuthenticated} onLike={onLike} />))}
        {isAuthenticated ? null : (
            <Card hoverable style={cardStyle} styles={{ body: { padding: 10, overflow: 'hidden' } }}>
                <Link to="/login">
                <Button icon={<LoginOutlined />} >
                    Login in to explore more...
                </Button>
                </Link>
            </Card>
            )
        }
    </div>
 
);

export default Messages;