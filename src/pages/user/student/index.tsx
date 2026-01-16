import { useState, useMemo, useCallback } from 'react';
import {
  DatePicker,
  Select,
  Input,
  Button,
  Table,
  Checkbox,
  Space,
  Pagination,
  Switch,
} from 'antd';
import {
  SearchOutlined,
  RedoOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import type { Dayjs } from 'dayjs';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { RangePicker } = DatePicker;

interface OrderData {
  key: string;
  userId: string;
  nickname: string;
  phone: string;
  amount: number;
  orderCount: number;
  payTime: string;
  disabled: boolean;
  checked: boolean;
}

// 模拟订单数据
const mockOrderData: OrderData[] = [
  {
    key: '1',
    userId: 'CODE001',
    nickname: '金金',
    phone: '15810000000',
    amount: 88.0,
    orderCount: 8,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
  {
    key: '2',
    userId: 'CODE002',
    nickname: '诸葛亮',
    phone: '15810000000',
    amount: 128.0,
    orderCount: 1,
    payTime: '2021.07.01 15:00',
    disabled: true,
    checked: false,
  },
  {
    key: '3',
    userId: 'CODE003',
    nickname: '曹操',
    phone: '15810000000',
    amount: 88.0,
    orderCount: 6,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
  {
    key: '4',
    userId: 'CODE004',
    nickname: '小张',
    phone: '15810000000',
    amount: 128.0,
    orderCount: 1,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
  {
    key: '5',
    userId: 'CODE005',
    nickname: '金金小张',
    phone: '15810000000',
    amount: 126.0,
    orderCount: 3,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: true,
  },
  {
    key: '6',
    userId: 'CODE006',
    nickname: '王小样',
    phone: '15810000000',
    amount: 88.0,
    orderCount: 8,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
  {
    key: '7',
    userId: 'CODE007',
    nickname: '穆一一',
    phone: '15810000000',
    amount: 68.0,
    orderCount: 6,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
  {
    key: '8',
    userId: 'CODE008',
    nickname: '邓君',
    phone: '15810000000',
    amount: 88.0,
    orderCount: 8,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
  {
    key: '9',
    userId: 'CODE009',
    nickname: '刘备',
    phone: '15810000000',
    amount: 128.0,
    orderCount: 1,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
  {
    key: '10',
    userId: 'CODE010',
    nickname: '关于',
    phone: '15810000000',
    amount: 88.0,
    orderCount: 3,
    payTime: '2021.07.01 15:00',
    disabled: false,
    checked: false,
  },
];

const StudentManager = () => {
  // 搜索参数状态
  const [searchParams, setSearchParams] = useState({
    timeRange: [null, null] as [Dayjs | null, Dayjs | null],
    orderStatus: '',
    keyword: '',
  });

  // 全选/选中行状态
  const [selectedRowKeys, setSelectedRowKeys] = useState(['2']); // 初始选中CODE003
  const [allChecked, setAllChecked] = useState(false);

  // 搜索参数变更
  const handleTimeChange = (dates: [Dayjs | null, Dayjs | null] | null) =>
    setSearchParams({ ...searchParams, timeRange: dates || [null, null] });
  const handleStatusChange = (val: string) =>
    setSearchParams({ ...searchParams, orderStatus: val });
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchParams({ ...searchParams, keyword: e.target.value });

  // 搜索/重置
  const handleSearch = () => console.log('搜索参数:', searchParams);
  const handleReset = () =>
    setSearchParams({ timeRange: [null, null], orderStatus: '', keyword: '' });

  // 全选逻辑
  const handleAllCheck = useCallback((e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setSelectedRowKeys(checked ? mockOrderData.map((item) => item.key) : []);
  }, []);

  // 行选逻辑
  const handleRowCheck = useCallback((e: CheckboxChangeEvent, key: string) => {
    setSelectedRowKeys((prev) => {
      const newSelected = [...prev];
      if (e.target.checked) {
        newSelected.push(key);
      } else {
        newSelected.splice(newSelected.indexOf(key), 1);
      }
      setAllChecked(newSelected.length === mockOrderData.length);
      return newSelected;
    });
  }, []);

  // 表格列配置
  const columns = useMemo(
    () => [
      {
        title: <Checkbox className="table-header-checkbox" />,
        dataIndex: 'check',
        render: (_, record) => <Checkbox checked={record.checked} />,
        width: 60,
      },
      {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
        width: 120,
      },
      {
        title: '用户昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 120,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 140,
      },
      {
        title: '付费金额',
        dataIndex: 'amount',
        key: 'amount',
        render: (val) => `¥${val.toFixed(2)}`,
        width: 120,
      },
      {
        title: '订单数量',
        dataIndex: 'orderCount',
        key: 'orderCount',
        width: 120,
      },
      {
        title: '付费时间',
        dataIndex: 'payTime',
        key: 'payTime',
        width: 180,
      },
      {
        title: '账户禁用',
        dataIndex: 'disabled',
        key: 'disabled',
        width: 140,
        render: (val) => <Switch checked={val} />,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 100,
        render: () => (
          <Space size="small">
            <Button
              type="link"
              icon={<EditOutlined />}
              className={styles.viewLink}
            >
              编辑
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className={styles.deleteLink}
            >
              删除
            </Button>
          </Space>
        ),
      },
    ],
    [selectedRowKeys, allChecked, handleAllCheck, handleRowCheck],
  );

  return (
    <div className={styles.container}>
      {/* 搜索区域 */}
      <div className={styles.searchBar}>
        <div className={styles.searchItem}>
          <span className={styles.label}>提交时间</span>
          <RangePicker
            format="YYYY-MM-DD"
            value={searchParams.timeRange}
            onChange={handleTimeChange}
            className={styles.timePicker}
          />
        </div>
        <div className={styles.searchItem}>
          <span className={styles.label}>订单状态</span>
          <Select
            placeholder="请选择"
            value={searchParams.orderStatus}
            onChange={handleStatusChange}
            className={styles.select}
          />
        </div>
        <div className={styles.searchItem}>
          <span className={styles.label}>手动搜索</span>
          <Input
            placeholder="请输入订单号,用户账号,昵称"
            value={searchParams.keyword}
            onChange={handleKeywordChange}
            className={styles.input}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            className={styles.searchBtn}
          >
            搜索
          </Button>
          <Button
            icon={<RedoOutlined />}
            onClick={handleReset}
            className={styles.resetBtn}
          >
            重置
          </Button>
        </div>
      </div>

      {/* 订单列表 */}
      <div className={styles.list}>
        <h3 className={styles.listTitle}>学员列表</h3>
        <Table
          columns={columns}
          dataSource={mockOrderData}
          pagination={false}
          bordered
          className={styles.table}
          rowKey="key"
        />
      </div>

      {/* 底部全选+分页 */}
      <div className={styles.footerBar}>
        <Space>
          <Checkbox checked={allChecked} onChange={handleAllCheck}>
            全选
          </Checkbox>
          <a className={styles.exportLink}>批量导出</a>
        </Space>
        <div className={styles.paginationWrap}>
          <span className={styles.pageInfo}>共10页, 100条数据</span>
          <Pagination
            current={1}
            total={100}
            pageSize={10}
            className={styles.pagination}
          />
          <span className={styles.jumpWrap}>
            跳至
            <Input className={styles.jumpInput} size="small" defaultValue={1} />
            页
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentManager;
