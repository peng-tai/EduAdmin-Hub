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
import {
  SearchOutlined,
  RedoOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import type { Dayjs } from 'dayjs';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { RangePicker } = DatePicker;

interface OrderData {
  key: string;
  code: string;
  name: string;
  scope: string;
  threshold: string;
  denomination: number;
  validity: string;
  checked: boolean; 
}

// 模拟订单数据
const mockOrderData: OrderData[] = [
  {
    key: '1',
    code: 'CODE001',
    name: '轮播图名称文字示例1',
    scope: '所有课程',
    threshold: '满0-50',
    denomination: 88.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '2',
    code: 'CODE002',
    name: '如果超出十个字则...',
    scope: '特惠课程',
    threshold: '满99-80',
    denomination: 128.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '3',
    code: 'CODE003',
    name: '这是轮播图示例3',
    scope: '秒杀课程',
    threshold: '满0-50',
    denomination: 88.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '4',
    code: 'CODE004',
    name: '轮播图名称示例4',
    scope: '所有课程',
    threshold: '满0-50',
    denomination: 128.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '5',
    code: 'CODE005',
    name: '轮播图名称示例5',
    scope: '特惠课程',
    threshold: '满99-80',
    denomination: 126.0,
    validity: '2021.07.01 15:00',
    checked: true,
  },
  {
    key: '6',
    code: 'CODE006',
    name: '轮播图名称示例6',
    scope: '秒杀课程',
    threshold: '满0-50',
    denomination: 88.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '7',
    code: 'CODE007',
    name: '轮播图名称示例7',
    scope: '所有课程',
    threshold: '满0-50',
    denomination: 68.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '8',
    code: 'CODE008',
    name: '轮播图名称示例8',
    scope: '特惠课程',
    threshold: '满99-80',
    denomination: 88.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '9',
    code: 'CODE009',
    name: '轮播图名称示例9',
    scope: '秒杀课程',
    threshold: '满0-50',
    denomination: 128.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '10',
    code: 'CODE010',
    name: '轮播图名称示例10',
    scope: '秒杀课程',
    threshold: '满0-50',
    denomination: 88.0,
    validity: '2021.07.01 15:00',
    checked: false,
  },
];

const Coupon = () => {
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
        dataIndex: 'checked',
        render: (checked) => <Checkbox checked={checked} />,
        width: 40,
      },
      {
        title: '编号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '使用范围',
        dataIndex: 'scope',
        key: 'scope',
      },
      {
        title: '使用门槛',
        dataIndex: 'threshold',
        key: 'threshold',
      },
      {
        title: '面值',
        dataIndex: 'denomination',
        key: 'denomination',
        render: (val) => `¥${val.toFixed(2)}`,
      },
      {
        title: '有效期',
        dataIndex: 'validity',
        key: 'validity',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: () => (
          <Space size="small">
            <Button
              type="link"
              icon={<EyeOutlined />}
              className="action-btn view"
            >
              查看
            </Button>
            <Button
              type="link"
              icon={<EditOutlined />}
              className="action-btn edit"
            >
              编辑
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className="action-btn delete"
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
        <h3 className={styles.listTitle}>优惠卷列表</h3>
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

export default Coupon;
