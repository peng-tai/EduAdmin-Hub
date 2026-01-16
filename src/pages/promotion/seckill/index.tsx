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
  SettingOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import type { Dayjs } from 'dayjs';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { RangePicker } = DatePicker;

interface OrderData {
  key: string;
  activityNo: string;
  title: string;
  cover: string;
  status: string;
  startTime: string;
  endTime: string;
  checked: boolean;
}

// 模拟订单数据
const mockOrderData: OrderData[] = [
  {
    key: '1',
    activityNo: 'CODE001',
    title: '轮播图研究文字示例1',
    cover: 'https://picsum.photos/id/21/60/40',
    status: '进行中',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '2',
    activityNo: 'CODE002',
    title: '如果超出十个字则...',
    cover: 'https://picsum.photos/id/22/60/40',
    status: '已下线',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '3',
    activityNo: 'CODE003',
    title: '这里轮播活动3',
    cover: 'https://picsum.photos/id/23/60/40',
    status: '已下线',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '4',
    activityNo: 'CODE004',
    title: '盖说明名称示例4',
    cover: 'https://picsum.photos/id/24/60/40',
    status: '已下线',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: true,
  },
  {
    key: '5',
    activityNo: 'CODE005',
    title: '说明名称示例5',
    cover: 'https://picsum.photos/id/25/60/40',
    status: '已下线',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '6',
    activityNo: 'CODE006',
    title: '轮播活动示例6',
    cover: 'https://picsum.photos/id/26/60/40',
    status: '进行中',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '7',
    activityNo: 'CODE007',
    title: '说明活动名称7',
    cover: 'https://picsum.photos/id/27/60/40',
    status: '进行中',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '8',
    activityNo: 'CODE008',
    title: '说明活动名称8',
    cover: 'https://picsum.photos/id/28/60/40',
    status: '进行中',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '9',
    activityNo: 'CODE009',
    title: '说明活动名称9',
    cover: 'https://picsum.photos/id/29/60/40',
    status: '已下线',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '10',
    activityNo: 'CODE010',
    title: '说明名称示例10',
    cover: 'https://picsum.photos/id/30/60/40',
    status: '已下线',
    startTime: '2021.07.01 15:00',
    endTime: '2021.07.01 15:00',
    checked: false,
  },
];

const Seckill = () => {
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
        width: 60,
      },
      {
        title: '活动编号',
        dataIndex: 'activityNo',
        key: 'activityNo',
        width: 140,
      },
      {
        title: '活动标题',
        dataIndex: 'title',
        key: 'title',
        width: 120,
      },
      {
        title: '活动封面',
        dataIndex: 'cover',
        key: 'cover',
        width: 140,
        render: (cover) => (
          <img src={cover} alt="活动封面" className="activity-cover" />
        ),
      },
      {
        title: '活动状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status) => (
          <span
            className={
              status === '进行中' ? 'status-active' : 'status-inactive'
            }
          >
            {status}
          </span>
        ),
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 140,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 140,
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
              icon={<SettingOutlined />}
              className={styles.viewLink}
            >
              设置
            </Button>
            <Button
              type="link"
              icon={<EditOutlined />}
              className={styles.editLink}
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
        <h3 className={styles.listTitle}>秒杀活动列表</h3>
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

export default Seckill;
