import React, { useEffect, useState } from 'react';
import Message from '../components/Message';

import { Typography } from 'antd';
import { Flex, Layout, Skeleton } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FooterContent from '../components/Footer';

import MessageWritter from '../components/MessageWritter';

import { useGetQuacksQuery } from '../store/api';


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
  const { token } = useAuth();

  const { data: quacks, error, isLoading, refetch } = useGetQuacksQuery();

  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false); 

  useEffect(() => {
    if (fetchTrigger) {
      refetch();
      setFetchTrigger(false);
    }
  }, [fetchTrigger, refetch]);

  const handleRefetch = () => {
    setFetchTrigger(true);
  };

  const onLike = async (key:string) => {
    try {
      await fetch(`/api/quacks/${key}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setFetchTrigger((prev) => !prev);
     
    } catch (err) {
      // nop
    }
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title>Quacker</Title>
          <h4>The place to quack</h4>
        </Header>
        <Content style={contentStyle}>
          <Flex gap="middle" justify="center" align="center">
            <MessageWritter token={token} onMessagePublished={handleRefetch}></MessageWritter>
          </Flex>

          {isLoading ?
            <Skeleton /> : <Message isAuthenticated data={quacks ? quacks : []} onLike={onLike} />
          }
        </Content>
        <Footer style={footerStyle}>
          <FooterContent />
        </Footer>

      </Layout>
    </Flex>
  );
};

export default HomePage;

