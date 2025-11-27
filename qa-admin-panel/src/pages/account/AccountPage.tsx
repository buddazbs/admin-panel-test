import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Space, 
  Avatar,
  Upload,
  message,
  Typography,
  
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  UploadOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useAuth } from '../../entities/user/useAuth';

const { Title } = Typography;

export const AccountPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');

  const onFinishProfile = async (_values: { username: string; email: string }) => {
    setLoading(true);
    try {
      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Профиль успешно обновлен');
    } catch (error) {
      message.error('Ошибка обновления профиля');
    } finally {
      setLoading(false);
    }
  };

  const onFinishPassword = async (values: { oldPassword: string; newPassword: string; confirmNewPassword: string }) => {
    if (values.newPassword !== values.confirmNewPassword) {
      message.error('Пароли не совпадают');
      return;
    }
    
    setLoading(true);
    try {
      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Пароль успешно изменен');
    } catch (error) {
      message.error('Ошибка изменения пароля');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      // Имитация загрузки аватара
      setAvatarUrl('https://api.dicebear.com/7.x/miniavs/svg?seed=' + Math.floor(Math.random() * 100));
      message.success('Аватар успешно загружен');
    } else if (info.file.status === 'error') {
      message.error('Ошибка загрузки аватара');
    }
  };

  return (
    <div>
      <Title level={2}>Настройки аккаунта</Title>
      
      <Card>
        <Space align="start" style={{ marginBottom: 24 }}>
          <Avatar 
            size={100} 
            src={avatarUrl} 
            icon={<UserOutlined />} 
          />
          <div>
            <Upload 
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleAvatarChange}
            >
              <Button icon={<UploadOutlined />}>Изменить аватар</Button>
            </Upload>
            <p style={{ marginTop: 8, color: '#888' }}>
              JPG, PNG или GIF, макс. 2MB
            </p>
          </div>
        </Space>
      </Card>

      <Card title="Информация профиля" style={{ marginTop: 24 }}>
        <Form
          name="profile"
          onFinish={onFinishProfile}
          layout="vertical"
          initialValues={{
            username: user?.username,
            email: user?.email,
          }}
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
          >
            <Input prefix={<UserOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Пожалуйста, введите корректный email!' }
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SaveOutlined />}
              size="large"
            >
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Изменение пароля" style={{ marginTop: 24 }}>
        <Form
          name="password"
          onFinish={onFinishPassword}
          layout="vertical"
        >
          <Form.Item
            label="Текущий пароль"
            name="oldPassword"
            rules={[{ required: true, message: 'Пожалуйста, введите текущий пароль!' }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            label="Новый пароль"
            name="newPassword"
            rules={[{ required: true, message: 'Пожалуйста, введите новый пароль!' }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Form.Item
            label="Подтвердите новый пароль"
            name="confirmNewPassword"
            rules={[{ required: true, message: 'Пожалуйста, подтвердите новый пароль!' }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SaveOutlined />}
              size="large"
            >
              Изменить пароль
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};