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
} from 'antd';
import { SearchOutlined, RedoOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import type { Dayjs } from 'dayjs';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { RangePicker } = DatePicker;

interface OrderData {
  key: string;
  orderNo: string;
  nickname: string;
  phone: string;
  courseName: string;
  amount: number;
  status: string;
  submitTime: string;
  checked: boolean;
}

// 模拟订单数据
const mockOrderData: OrderData[] = [
  {
    key: '1',
    orderNo: 'CODE001',
    nickname: '金金',
    phone: '15810000000',
    courseName: '教程名称文字示例1',
    amount: 88.0,
    status: '待处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '2',
    orderNo: 'CODE002',
    nickname: '诸葛亮',
    phone: '15810000000',
    courseName: '如果超出八个字...',
    amount: 128.0,
    status: '已处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '3',
    orderNo: 'CODE003',
    nickname: '曹操',
    phone: '15810000000',
    courseName: '这是教程示例3',
    amount: 88.0,
    status: '已处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '4',
    orderNo: 'CODE004',
    nickname: '小张',
    phone: '15810000000',
    courseName: '是教程名称示例4',
    amount: 128.0,
    status: '已处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '5',
    orderNo: 'CODE005',
    nickname: '金金小张',
    phone: '15810000000',
    courseName: '教程名称示例5',
    amount: 126.0,
    status: '待处理',
    submitTime: '2021.07.01 15:00',
    checked: true,
  },
  {
    key: '6',
    orderNo: 'CODE006',
    nickname: '王小样',
    phone: '15810000000',
    courseName: '教程名称示例6',
    amount: 88.0,
    status: '待处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '7',
    orderNo: 'CODE007',
    nickname: '穆一一',
    phone: '15810000000',
    courseName: '教程名称示例7',
    amount: 68.0,
    status: '已处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '8',
    orderNo: 'CODE008',
    nickname: '邓君',
    phone: '15810000000',
    courseName: '教程名称示例8',
    amount: 88.0,
    status: '已处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '9',
    orderNo: 'CODE009',
    nickname: '刘备',
    phone: '15810000000',
    courseName: '教程名称示例9',
    amount: 128.0,
    status: '已处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '10',
    orderNo: 'CODE010',
    nickname: '关于',
    phone: '15810000000',
    courseName: '教程名称示例10',
    amount: 88.0,
    status: '已处理',
    submitTime: '2021.07.01 15:00',
    checked: false,
  },
];

const OrderRefund = () => {
  // 搜索参数状态
  const [searchParams, setSearchParams] = useState({
    timeRange: [null, null] as [Dayjs | null, Dayjs | null],
    orderStatus: '',
    keyword: '',
  });

  // 全选/选中行状态
  const [selectedRowKeys, setSelectedRowKeys] = useState(['5']); // 初始选中CODE005
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
    console.log('全选状态变更:', e.target.checked);
    const checked = e.target.checked;
    setAllChecked(checked);
    setSelectedRowKeys(checked ? mockOrderData.map((item) => item.key) : []);
  }, []);

  // 行选逻辑
  const handleRowCheck = useCallback((e: CheckboxChangeEvent, key: string) => {
    console.log('行选状态变更:', key, e.target.checked);
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
        title: (
          <Checkbox
            checked={allChecked}
            onChange={handleAllCheck}
            className={styles.headerCheckbox}
          />
        ),
        dataIndex: 'key',
        render: (key: string) => (
          <Checkbox
            checked={selectedRowKeys.includes(key)}
            onChange={(e) => handleRowCheck(e, key)}
          />
        ),
        width: 40,
      },
      {
        title: '订单编号',
        dataIndex: 'orderNo',
        key: 'orderNo',
        width: 120,
      },
      {
        title: '用户昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 140,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 140,
      },
      {
        title: '课程名称',
        dataIndex: 'courseName',
        key: 'courseName',
        width: 200,
        ellipsis: true, // 超出省略
      },
      {
        title: '订单金额',
        dataIndex: 'amount',
        width: 120,
        key: 'amount',
        render: (val) => `¥${val.toFixed(2)}`,
      },
      {
        title: '处理状态',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (status) => (
          <span
            className={
              status === '待处理' ? 'status-pending' : 'status-handled'
            }
          >
            {status}
          </span>
        ),
      },
      {
        width: 240,
        title: '提交时间',
        dataIndex: 'submitTime',
        key: 'submitTime',
      },
      {
        title: '操作',
        width: 120,
        dataIndex: 'action',
        key: 'action',
        render: () => (
          <Button
            type="link"
            icon={<EyeOutlined />}
            style={{
              color: '#2BC17B'
            }}
          >
            查看详情
          </Button>
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
        <h3 className={styles.listTitle}>退款订单列表</h3>
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

export default OrderRefund;
