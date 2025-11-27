import React, { useState } from 'react';
import { Layout } from 'antd';
import { SidebarMenu } from '../widgets/menu/SidebarMenu';
import { AppHeader } from '../widgets/menu/Header';

const { Content } = Layout;

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout 
        className={collapsed ? 'collapsed' : ''}
        style={{ 
          marginLeft: collapsed ? 80 : 250,
          transition: 'margin-left 0.2s'
        }}
      >
        <AppHeader />
        <Content style={{ 
          margin: '24px 16px 0', 
          overflow: 'initial',
          paddingTop: 24
        }}>
          <div className="main-content">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};