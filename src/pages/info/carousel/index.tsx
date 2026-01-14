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
} from '@ant-design/icons';
import styles from './index.module.scss';
import type { Dayjs } from 'dayjs';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { RangePicker } = DatePicker;

interface OrderData {
  key: string;
  name: string;
  thumb: string;
  desc: string;
  uploader: string;
  addTime: string;
  checked: boolean;
}

// 模拟订单数据
const mockOrderData: OrderData[] = [
  {
    key: '1',
    name: '轮播图名称文字示例1',
    thumb: 'https://picsum.photos/id/1/80/50',
    desc: '轮播图说明文字示例1',
    uploader: '金金',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '2',
    name: '如果超出十个字则...',
    thumb: 'https://picsum.photos/id/2/80/50',
    desc: '如果超出十个字则...',
    uploader: '诸葛亮',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '3',
    name: '这是轮播图示例3',
    thumb: 'https://picsum.photos/id/3/80/50',
    desc: '这是说明示例3',
    uploader: '曹操',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '4',
    name: '是轮播图名称示例4',
    thumb: 'https://picsum.photos/id/4/80/50',
    desc: '是说明名称示例4',
    uploader: '小张',
    addTime: '2021.07.01 15:00',
    checked: true,
  },
  {
    key: '5',
    name: '轮播图名称示例5',
    thumb: 'https://picsum.photos/id/5/80/50',
    desc: '说明名称示例5',
    uploader: '金金小张',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '6',
    name: '轮播图名称示例6',
    thumb: 'https://picsum.photos/id/6/80/50',
    desc: '说明名称示例6',
    uploader: '王小样',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '7',
    name: '轮播图名称示例7',
    thumb: 'https://picsum.photos/id/7/80/50',
    desc: '说明名称示例7',
    uploader: '穆一一',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '8',
    name: '轮播图名称示例8',
    thumb: 'https://picsum.photos/id/8/80/50',
    desc: '说明名称示例8',
    uploader: '邓君',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '9',
    name: '轮播图名称示例9',
    thumb: 'https://picsum.photos/id/9/80/50',
    desc: '说明名称示例9',
    uploader: '刘备',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '10',
    name: '轮播图名称示例10',
    thumb: 'https://picsum.photos/id/10/80/50',
    desc: '说明名称示例10',
    uploader: '关于',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
];

const CarouselManager = () => {
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
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '缩略图',
        dataIndex: 'thumb',
        key: 'thumb',
        render: (thumb) => (
          <img src={thumb} alt="轮播图缩略图" className="carousel-thumb" />
        ),
        width: 120,
      },
      {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '上传人',
        dataIndex: 'uploader',
        key: 'uploader',
      },
      {
        title: '添加时间',
        dataIndex: 'addTime',
        key: 'addTime',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: () => (
          <Space size="small">
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
        <h3 className={styles.listTitle}>轮播图列表</h3>
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

export default CarouselManager;
