import React from 'react';
import { Card, Typography, Row, Col, Statistic, Space, Avatar } from 'antd';
import { 
  BugOutlined, 
  CheckCircleOutlined, 
  SyncOutlined, 
  
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useAuth } from '../../entities/user/useAuth';

const { Title, Text } = Typography;

// Моковые данные для статистики
const MOCK_STATS = {
  totalTests: 1247,
  passedTests: 987,
  failedTests: 42,
  runningTests: 18,
  markets: 12,
};



export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Приветствие пользователя */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            size={64} 
            src={user?.avatar} 
            icon={<UserOutlined />} 
            style={{ marginRight: 16 }}
          />
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Рад видеть вас снова, {user?.username}!
            </Title>
            <Text type="secondary">Статистика по автотестам</Text>
          </div>
        </div>
      </Card>
      
      {/* Статистика тестов */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Всего тестов"
              value={MOCK_STATS.totalTests}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Пройдено"
              value={MOCK_STATS.passedTests}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Провалено"
              value={MOCK_STATS.failedTests}
              prefix={<BugOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Выполняется"
              value={MOCK_STATS.runningTests}
              prefix={<SyncOutlined spin />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Графики */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card 
            title="Результаты тестов по дням" 
            extra={<BarChartOutlined style={{ color: '#1890ff' }} />}
          >
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Space direction="vertical" size="large">
                <BarChartOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>График результатов тестов</Title>
                  <Text type="secondary">Столбчатая диаграмма с результатами тестов по дням</Text>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="Статусы тестов" 
            extra={<PieChartOutlined style={{ color: '#ff4d4f' }} />}
          >
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Space direction="vertical" size="large">
                <PieChartOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>Распределение статусов</Title>
                  <Text type="secondary">Круговая диаграмма с распределением статусов тестов</Text>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card 
            title="Динамика тестов" 
            extra={<LineChartOutlined style={{ color: '#52c41a' }} />}
          >
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Space direction="vertical" size="large">
                <LineChartOutlined style={{ fontSize: 48, color: '#52c41a' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>Динамика прохождения тестов</Title>
                  <Text type="secondary">Линейный график с динамикой прохождения тестов</Text>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};