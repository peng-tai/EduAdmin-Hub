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
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
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
  amount: string;
  status: string;
  submitTime: string;
}

// 模拟订单数据
const mockOrderData: OrderData[] = [
  {
    key: '1',
    orderNo: 'CODE001',
    nickname: '金金',
    phone: '15810000000',
    courseName: '教程名称文字示例1',
    amount: '88.00',
    status: '待支付',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '2',
    orderNo: 'CODE002',
    nickname: '诸葛亮',
    phone: '15810000000',
    courseName: '如果超出八个字显...',
    amount: '128.00',
    status: '已支付',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '3',
    orderNo: 'CODE003',
    nickname: '曹操',
    phone: '15810000000',
    courseName: '这是教程示例3',
    amount: '88.00',
    status: '已关闭',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '4',
    orderNo: 'CODE004',
    nickname: '小张',
    phone: '15810000000',
    courseName: '教程名称示例4',
    amount: '128.00',
    status: '已支付',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '5',
    orderNo: 'CODE005',
    nickname: '金金小张',
    phone: '15810000000',
    courseName: '教程名称示例5',
    amount: '126.00',
    status: '待支付',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '6',
    orderNo: 'CODE006',
    nickname: '王小样',
    phone: '15810000000',
    courseName: '教程名称示例6',
    amount: '88.00',
    status: '已支付',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '7',
    orderNo: 'CODE007',
    nickname: '穆一一',
    phone: '15810000000',
    courseName: '教程名称示例7',
    amount: '68.00',
    status: '已支付',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '8',
    orderNo: 'CODE008',
    nickname: '邓基',
    phone: '15810000000',
    courseName: '教程名称示例8',
    amount: '88.00',
    status: '已关闭',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '9',
    orderNo: 'CODE009',
    nickname: '刘备',
    phone: '15810000000',
    courseName: '教程名称示例9',
    amount: '128.00',
    status: '已支付',
    submitTime: '2021.07.01 15:00',
  },
  {
    key: '10',
    orderNo: 'CODE0010',
    nickname: '关于',
    phone: '15810000000',
    courseName: '教程名称示例10',
    amount: '88.00',
    status: '已支付',
    submitTime: '2021.07.01 15:00',
  },
];

const OrderList = () => {
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
      { title: '订单编号', dataIndex: 'orderNo', width: 120 },
      { title: '用户昵称', dataIndex: 'nickname', width: 140 },
      { title: '手机号', dataIndex: 'phone', width: 140 },
      { title: '课程名称', dataIndex: 'courseName', width: 200 },
      { title: '订单金额', dataIndex: 'amount', width: 120 },
      { title: '订单状态', dataIndex: 'status', width: 120 },
      { title: '提交时间', dataIndex: 'submitTime', width: 240 },
      {
        title: '操作',
        width: 100,
        render: (_: unknown, record: OrderData) => (
          <Space>
            <a className={styles.viewLink}>查看</a>
            {record.status === '待支付' && (
              <a className={styles.cancelLink}>取消</a>
            )}
            {record.status === '已关闭' && (
              <a className={styles.deleteLink}>删除</a>
            )}
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
        <h3 className={styles.listTitle}>订单列表</h3>
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

export default OrderList;
