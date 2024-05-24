import React, { useEffect, useState } from 'react';
import Message from '../components/Message';

import { Typography } from 'antd';
import { Flex, Layout, Skeleton } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FooterContent from '../components/Footer';

import MessageWritter from '../components/MessageWritter';

import './index.css';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;


interface IAuthor {
  username: string;
}

interface IDataItem {
  key: string;
  content: string;
  author: IAuthor;
  createdAt: string;
  likes: number;
}

interface IQuack {
  key: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
}

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
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();


  const [data, setData] = useState<IQuack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false); 


  const fetchData = async () => {
    try {
      const response = await fetch('/api/quacks');
      const data: IDataItem[] = await response.json();
      setData(data.map((item): IQuack => {
        return {
          key: item.key,
          content: item.content,
          author: item.author.username,
          createdAt: item.createdAt,
          likes: item.likes
        }
      }))
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
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
      setError('Error fetching data');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchTrigger]);
  
  useEffect(()=>{
    if (isAuthenticated) {
      return navigate('/app', {replace:true});
    }
  }, [isAuthenticated, navigate]);

  if (error) {
    return <div>{error}</div>;
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
            <MessageWritter token={token} onMessagePublished={fetchData}></MessageWritter>
          </Flex>

          {loading ?
            <Skeleton /> : <Message isAuthenticated data={data} onLike={onLike} />
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

