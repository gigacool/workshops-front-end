import { Typography } from 'antd';
import { Flex, Layout } from 'antd';

import FooterContent from '../components/Footer';
import Login from '../components/Login';

import './index.css';

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

const HomePage: React.FC = () => {
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Layout.Header style={headerStyle}>
          <Typography.Title>Quacker</Typography.Title>
          <h4>The place to quack</h4>
        </Layout.Header>
        <Layout.Content style={contentStyle}>
            <Login />
        </Layout.Content>
        <Layout.Footer style={footerStyle}>
          <FooterContent />
        </Layout.Footer>
      </Layout>
    </Flex>
  );
};

export default HomePage;

