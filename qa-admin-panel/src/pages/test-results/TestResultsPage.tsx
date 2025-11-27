import React from 'react';
import { 
  Card, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Table,
  message
} from 'antd';
import { 
  ReloadOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useAutotests } from '../../shared/hooks/useAutotests';

const { Title } = Typography;

// Типы статусов тестов
type TestStatus = 'passed' | 'failed' | 'running';

const getStatusConfig = (status: TestStatus) => {
  switch (status) {
    case 'passed':
      return { color: 'success', text: 'Пройден', icon: <CheckCircleOutlined /> };
    case 'failed':
      return { color: 'error', text: 'Провален', icon: <CloseCircleOutlined /> };
    case 'running':
      return { color: 'processing', text: 'Выполняется', icon: <SyncOutlined spin /> };
    default:
      return { color: 'default', text: 'Неизвестно', icon: null };
  }
};

export const TestResultsPage: React.FC = () => {
  const { markets, testResults, rerunTest } = useAutotests();

  const handleRerunTest = (testResultId: string) => {
    const testResult = testResults.find(result => result.id === testResultId);
    
    if (!testResult) return;
    
    // Проверяем, не запущен ли уже тест
    if (testResult.status === 'running') {
      message.warning('Тест уже выполняется');
      return;
    }
    
    rerunTest(testResultId);
    message.success(`Перезапущен тест: ${testResult.testName}`);
  };

  // Получаем имя рынка по ID
  const getMarketName = (marketId: string) => {
    const market = markets.find(m => m.id === marketId);
    return market ? market.name : marketId;
  };

  const columns = [
    {
      title: 'Рынок',
      dataIndex: 'marketId',
      key: 'marketId',
      render: (marketId: string) => getMarketName(marketId),
    },
    {
      title: 'Название теста',
      dataIndex: 'testName',
      key: 'testName',
    },
    {
      title: 'Ожидаемый результат',
      dataIndex: 'expected',
      key: 'expected',
    },
    {
      title: 'Фактический результат',
      dataIndex: 'actual',
      key: 'actual',
      render: (actual: string, record: typeof testResults[0]) => {
        const statusConfig = getStatusConfig(record.status);
        return (
          <Space>
            {statusConfig.icon}
            <span>{actual}</span>
          </Space>
        );
      },
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: TestStatus) => {
        const statusConfig = getStatusConfig(status);
        return (
          <Tag color={statusConfig.color} icon={statusConfig.icon} className={status === 'running' ? 'status-tag processing' : 'status-tag'}>
            {statusConfig.text}
          </Tag>
        );
      },
    },
    {
      title: 'Время запуска',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: typeof testResults[0]) => (
        <Button 
          type="primary" 
          icon={<ReloadOutlined />}
          onClick={() => handleRerunTest(record.id)}
          disabled={record.status === 'running'}
          size="small"
        >
          Перезапустить
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Результаты автотестов</Title>
      
      <Card>
        <Table 
          dataSource={testResults} 
          columns={columns} 
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </Card>
    </div>
  );
};