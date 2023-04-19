import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import Phim from './phim/Phim'
import { NavLink } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'), ]), 
  getItem('Quản lý phim', 'sub2', <TeamOutlined />, [
    getItem(<NavLink to='/admin/phim'>Phim</NavLink>, '6'),
    getItem(<NavLink to='/admin/addnew'>Thêm Phim</NavLink>, '8')]),
  getItem('Files', '9', <FileOutlined />,[
    // getItem(<NavLink to='/admin/showtime'>ShowTime</NavLink>,'9')
  ]),
];



const TemplateAdmin = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  return (

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
           
            {children}

          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >

        </Footer>
      </Layout>
    </Layout>
  );
};
export default TemplateAdmin;