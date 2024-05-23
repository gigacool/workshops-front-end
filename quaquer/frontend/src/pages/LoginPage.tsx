import React, { useEffect, useState } from 'react';


import { Typography } from 'antd';
import { Flex, Layout } from 'antd';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'

import FooterContent from '../components/Footer';
import Login from '../components/Login';

import './index.css';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;




const layoutStyle: React.CSSProperties = {
  overflow: 'auto',
  margin: '0 auto',
  width: '100%',
  maxWidth: 540
}

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '0',
  color: '#666',
  backgroundColor: '#fff',
  height: 160
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '0',
  color: '#666',
  backgroundColor: '#fff',
  minHeight: 600,
}


const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#666',
  backgroundColor: '#fff',
}

// const style:React.CSSProperties = {
//     textAlign:'center',
// }

const HomePage: React.FC = () => {






  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title>Quacker</Title>
          <h4>The place to quack</h4>
        </Header>
        <Content style={contentStyle}>
          
            <Login />

        </Content>
        <Footer style={footerStyle}>
          <FooterContent />
        </Footer>

      </Layout>
    </Flex>
  );
};

export default HomePage;

