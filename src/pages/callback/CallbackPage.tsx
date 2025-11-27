import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Select, 
  Input, 
  Button, 
  Space, 
  message,
  Typography
} from 'antd';
import { SendOutlined, WarningOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// Моковые данные рынков
const MOCK_MARKETS = [
  { id: 'at-bk', name: 'AT: BK' },
  { id: 'at-pb', name: 'AT: PB' },
  { id: 'at-nyse', name: 'AT: NYSE' },
  { id: 'at-lse', name: 'AT: LSE' },
  { id: 'at-tse', name: 'AT: TSE' },
  { id: 'at-fwb', name: 'AT: FWB' },
];

export const CallbackPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { market: string; transactionId: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Валидация данных
      if (!values.market) {
        throw new Error('Пожалуйста, выберите рынок');
      }
      
      if (!values.transactionId || values.transactionId.trim() === '') {
        throw new Error('Пожалуйста, введите номер транзакции');
      }
      
      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Имитация случайной ошибки для демонстрации
      if (Math.random() < 0.3) {
        throw new Error('Ошибка сервера. Пожалуйста, попробуйте позже.');
      }
      
      message.success('Коллбэк успешно отправлен');
      form.resetFields();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, заполните все обязательные поля');
  };

  return (
    <div>
      <Title level={2}>Отправить коллбэк</Title>
      
      <Card>
        <Form
          form={form}
          name="callback"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Рынок"
            name="market"
            rules={[{ required: true, message: 'Пожалуйста, выберите рынок!' }]}
          >
            <Select 
              placeholder="Выберите рынок"
              size="large"
            >
              {MOCK_MARKETS.map(market => (
                <Option key={market.id} value={market.id}>
                  {market.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Номер транзакции"
            name="transactionId"
            rules={[
              { required: true, message: 'Пожалуйста, введите номер транзакции!' },
              { pattern: /^\d+$/, message: 'Номер транзакции должен содержать только цифры' }
            ]}
          >
            <Input 
              placeholder="Введите номер транзакции"
              size="large"
            />
          </Form.Item>

          {error && (
            <div style={{ 
              background: '#fff2f0', 
              border: '1px solid #ffccc7', 
              padding: 12, 
              borderRadius: 4, 
              marginBottom: 16 
            }}>
              <Space>
                <WarningOutlined style={{ color: '#ff4d4f' }} />
                <Text type="danger">{error}</Text>
              </Space>
            </div>
          )}

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SendOutlined />}
              size="large"
            >
              Отправить коллбэк
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};