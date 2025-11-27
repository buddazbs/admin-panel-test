import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../entities/user/useAuth';
import DarkVeil from '../../shared/animations/background/DarkVeil';
import './AuthPage.css'

const { Title } = Typography;

export const AuthPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const success = await login(values);
      if (success) {
        message.success('Успешная авторизация');
        navigate('/dashboard');
      } else {
        message.error('Неверное имя пользователя или пароль');
      }
    } catch {
      message.error('Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#0c1018' }}>
      <DarkVeil />

      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <Card style={{
          width: 420,
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          background: 'rgba(20,28,38,0.85)',
          pointerEvents: 'all',
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0px)' : 'translateY(-20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          color: '#fff',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2} style={{ color: '#fff' }}>QA Payments</Title>
            <p style={{ color: '#ccc' }}>Войдите в свою учетную запись</p>
          </div>
          <Form
            name="auth"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
            >
              <Input 
                className="input-dark"
                prefix={<UserOutlined style={{ color: '#fff' }} />} 
                placeholder="Имя пользователя" 
                size="large"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
            >
              <Input
                className="input-dark"
                prefix={<LockOutlined style={{ color: '#fff' }} />}
                type="password"
                placeholder="Пароль"
                size="large"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none' }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                size="large"
                style={{
                  background: '#1f6f9b',
                  borderColor: '#1f6f9b',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <p style={{ color: '#ccc' }}><strong>Демо учетные данные:</strong></p>
            <p style={{ color: '#ccc' }}>Администратор: admin / password</p>
            <p style={{ color: '#ccc' }}>Пользователь: user / password</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
