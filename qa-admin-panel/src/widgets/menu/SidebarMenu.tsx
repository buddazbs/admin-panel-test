import React from 'react';
import { Layout, Menu, Button, Avatar } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  DashboardOutlined,
  BugOutlined,
  BarChartOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../entities/user/useAuth';

const { Sider } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
  roles: ('admin' | 'user')[];
}

const menuItems: MenuItem[] = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: 'Дашборд', path: '/dashboard', roles: ['admin','user'] },
  { key: '/autotests', icon: <BugOutlined />, label: 'Автотесты', path: '/autotests', roles: ['admin'] },
  { key: '/test-results', icon: <BarChartOutlined />, label: 'Результаты тестов', path: '/test-results', roles: ['admin'] },
  { key: '/callback', icon: <SendOutlined />, label: 'Отправить коллбэк', path: '/callback', roles: ['admin','user'] },
  { key: '/account', icon: <UserOutlined />, label: 'Аккаунт', path: '/account', roles: ['admin','user'] },
];

export const SidebarMenu: React.FC<{ collapsed: boolean; setCollapsed: (c: boolean) => void }> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const filteredMenuItems = menuItems.filter(item =>
    user && item.roles.includes(user.role as 'admin' | 'user')
  );

  // Отделяем последний пункт (аккаунт) в футер.
  const bottomItemIndex = filteredMenuItems.findIndex(i => i.path === '/account');
  const bottomItem = bottomItemIndex !== -1 ? filteredMenuItems[bottomItemIndex] : null;
  const mainItems = filteredMenuItems.filter(i => i.path !== '/account');

  const active = filteredMenuItems.find(i => location.pathname === i.path || location.pathname.startsWith(i.path + '/'))?.path
               || undefined;

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(String(key));
  };

  const handleBottomClick = () => {
    if (bottomItem) navigate(bottomItem.path);
  };

  return (
<Sider
  trigger={null}
  collapsible
  collapsed={collapsed}
  collapsedWidth={64}
  width={250}
  style={{
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    background: '#0b1b2b',
    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
    transition: 'width 0.3s ease',
  }}
>
  {/* Верх: логотип/текст + toggle */}
  <div
    style={{
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'space-between',
      padding: '0 12px',
      transition: 'all 0.3s ease',
    }}
  >
    {!collapsed && (
      <div style={{
        color: 'white',
        fontWeight: 700,
        fontSize: 18,
        opacity: collapsed ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        QA Payments
      </div>
    )}

    <Button
      type="primary"
      onClick={toggleCollapsed}
      aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
      style={{
        height: 40,
        minWidth: 40,
        padding: 0,
        borderRadius: 8,
        background: '#1f6f9b',
        borderColor: '#1f6f9b',
        boxShadow: '0 1px 0 rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      icon={collapsed 
        ? <RightOutlined style={{ fontSize: 16, color: 'white' }} /> 
        : <LeftOutlined style={{ fontSize: 16, color: 'white' }} />}
    />
  </div>

  {/* Центр: прокручиваемое меню */}
<div style={{ flex: 1, overflow: 'auto', padding: '8px 8px 0 8px' }}>
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={active ? [active] : []}
      onClick={handleMenuClick}
      items={mainItems.map(item => ({
        key: item.path,
        icon: item.icon,
        label: item.label,
        style: { fontSize: 16, fontWeight: 600, paddingLeft: 12 },
      }))}
      style={{
        background: 'transparent',
        border: 'none',
        color: '#e6f7ff',
        paddingTop: 8,
        lineHeight: '40px',
        userSelect: 'none',
      }}
    />
  </div>

  {/* Футер с аватаркой */}
{/* Футер с аватаркой — точно как твоя кнопка сверху, но без Button */}
{bottomItem && (
  <div
    style={{
      padding: '12px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
    }}
  >
    <div
      role="button"
      tabIndex={0}
      onClick={handleBottomClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBottomClick();
        }
      }}
      aria-label="Перейти в аккаунт"
      style={{
        height: 48,
        width: collapsed ? 48 : '100%',
        maxWidth: 220,
        padding: collapsed ? 0 : '0 12px',
        borderRadius: 8,
        background: active === bottomItem.path 
          ? 'rgba(30,144,255,0.12)' 
          : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: 12,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        outline: 'none',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!collapsed && active !== bottomItem.path) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!collapsed && active !== bottomItem.path) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {/* Аватарка — идеальный круг, как у тебя задумано */}
      <div style={{
        flexShrink: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #1f6f9b',
        background: '#17364a',
      }}>
        <Avatar
          src={user?.avatar}
          icon={<UserOutlined />}
          size={40}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          shape="circle"
        />
      </div>

      {!collapsed && (
        <span style={{
          color: '#e6f7ff',
          fontWeight: 600,
          fontSize: 16,
          whiteSpace: 'nowrap',
        }}>
          {bottomItem.label}
        </span>
      )}
    </div>
  </div>
)}
</Sider>
  );
};
