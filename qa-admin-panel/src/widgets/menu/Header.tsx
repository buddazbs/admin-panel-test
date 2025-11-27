import React from 'react';
import { Layout, Dropdown, Space, Switch, Avatar, Badge, Tooltip, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../entities/user/useAuth';
import { useTheme } from '../../shared/hooks/useTheme';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Явная типизация items. Не использовать `as const`.
  const items: MenuProps['items'] = [
    { key: '/account', icon: <UserOutlined />, label: 'Профиль' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Настройки' },
    { type: 'divider' },
    { key: '/logout', icon: <LogoutOutlined />, label: 'Выйти' },
  ];

  // Типизация обработчика по MenuProps['onClick']
  const handleMenuClick: MenuProps['onClick'] = (info) => {
    const { key } = info;
    // key может быть React.Key, приводим к строке
    const path = String(key);

    if (path === '/logout') {
      logout();
      return;
    }

    // Навигация SPA
    navigate(path);
  };

  const menuProps: MenuProps = { items, onClick: handleMenuClick };

  return (
    <Header
      style={{
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 99,
        height: 64,
        background: isDarkTheme ? '#001529' : '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Левая часть */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: '#d915f3ff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
        }}>
          QA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 28 }}>Autotest</div>
        </div>
      </div>

      {/* Правая часть */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Tooltip title="Уведомления">
          <Button type="text" icon={<BellOutlined />} />
        </Tooltip>

        <Switch
          checked={isDarkTheme}
          onChange={toggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />

        <Dropdown menu={menuProps} trigger={['click']}>
          <Badge dot={false}>
            <Space style={{ cursor: 'pointer', alignItems: 'center' }}>
              <Avatar src={user?.avatar} icon={<UserOutlined />} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 600 }}>{user?.username || 'Гость'}</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{user?.role || ''}</div>
              </div>
            </Space>
          </Badge>
        </Dropdown>
      </div>
    </Header>
  );
};
