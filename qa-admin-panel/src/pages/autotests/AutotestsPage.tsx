import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Progress,
  message
} from 'antd';
import { 
  PlayCircleOutlined, 
  StopOutlined, 
  ReloadOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Моковые данные рынков
const MOCK_MARKETS = [
  { id: 'at-bk', name: 'AT: BK', status: 'completed', progress: 100, tests: 124, failed: 2 },
  { id: 'at-pb', name: 'AT: PB', status: 'running', progress: 65, tests: 89, failed: 1 },
  { id: 'at-nyse', name: 'AT: NYSE', status: 'stopped', progress: 0, tests: 0, failed: 0 },
  { id: 'at-lse', name: 'AT: LSE', status: 'error', progress: 30, tests: 56, failed: 5 },
  { id: 'at-tse', name: 'AT: TSE', status: 'completed', progress: 100, tests: 78, failed: 0 },
  { id: 'at-fwb', name: 'AT: FWB', status: 'completed', progress: 100, tests: 92, failed: 3 },
];

// Типы статусов
type TestStatus = 'completed' | 'running' | 'stopped' | 'error';

const getStatusConfig = (status: TestStatus) => {
  switch (status) {
    case 'completed':
      return { color: 'success', text: 'Завершено', icon: <BarChartOutlined /> };
    case 'running':
      return { color: 'processing', text: 'Выполняется', icon: <ReloadOutlined spin /> };
    case 'stopped':
      return { color: 'default', text: 'Остановлено', icon: <StopOutlined /> };
    case 'error':
      return { color: 'error', text: 'Ошибки', icon: <BarChartOutlined /> };
    default:
      return { color: 'default', text: 'Неизвестно', icon: null };
  }
};

export const AutotestsPage: React.FC = () => {
  const [markets, setMarkets] = useState(MOCK_MARKETS);

  const handleStartTest = (marketId: string) => {
    const market = markets.find(m => m.id === marketId);
    if (market && market.status !== 'running') {
      setMarkets(prev => 
        prev.map(m => 
          m.id === marketId 
            ? { ...m, status: 'running', progress: 0 } 
            : m
        )
      );
      message.success(`Запущены тесты для ${market.name}`);
    } else {
      message.warning('Тесты уже выполняются для этого рынка');
    }
  };

  const handleStopTest = (marketId: string) => {
    const market = markets.find(m => m.id === marketId);
    if (market && market.status === 'running') {
      setMarkets(prev => 
        prev.map(m => 
          m.id === marketId 
            ? { ...m, status: 'stopped', progress: 0 } 
            : m
        )
      );
      message.success(`Остановлены тесты для ${market.name}`);
    } else {
      message.warning('Нет активных тестов для остановки');
    }
  };

  return (
    <div>
      <Title level={2}>Автотесты и запуск</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {markets.map(market => {
          const statusConfig = getStatusConfig(market.status as TestStatus);
          
          return (
            <Col xs={24} sm={12} lg={8} key={market.id}>
              <Card 
                title={
                  <Space>
                    {statusConfig.icon}
                    <span>{market.name}</span>
                  </Space>
                }
                extra={
                  <Tag color={statusConfig.color}>
                    {statusConfig.text}
                  </Tag>
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleStartTest(market.id)}
                    disabled={market.status === 'running'}
                    key="start"
                  >
                    Запустить
                  </Button>,
                  <Button 
                    danger
                    icon={<StopOutlined />}
                    onClick={() => handleStopTest(market.id)}
                    disabled={market.status !== 'running'}
                    key="stop"
                  >
                    Остановить
                  </Button>
                ]}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>Прогресс: </Text>
                    <Progress 
                      percent={market.progress} 
                      status={market.status === 'error' ? 'exception' : 'normal'} 
                    />
                  </div>
                  <div>
                    <Text strong>Тестов: </Text>
                    <Text>{market.tests}</Text>
                  </div>
                  <div>
                    <Text strong>Провалено: </Text>
                    <Text type="danger">{market.failed}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Статистика запусков" extra={<BarChartOutlined />}>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Space direction="vertical" size="large">
                <BarChartOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>График запусков тестов по рынкам</Title>
                  <Text type="secondary">Столбчатая диаграмма с количеством запусков по рынкам</Text>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Частота падений" extra={<PieChartOutlined />}>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Space direction="vertical" size="large">
                <PieChartOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>Диаграмма частоты падений тестов</Title>
                  <Text type="secondary">Круговая диаграмма с частотой падений тестов</Text>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card title="Динамика тестов" extra={<LineChartOutlined />}>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Space direction="vertical" size="large">
                <LineChartOutlined style={{ fontSize: 48, color: '#52c41a' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>График общей динамики прохождения тестов</Title>
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