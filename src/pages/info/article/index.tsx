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
  title: string;
  cover: string;
  desc: string;
  uploader: string;
  addTime: string;
  checked: boolean;
}

// 模拟订单数据
const mockOrderData: OrderData[] = [
  {
    key: '1',
    title: '轮播图名称文字示例1',
    cover: 'https://picsum.photos/id/11/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '金金',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '2',
    title: '如果超出十个字则...',
    cover: 'https://picsum.photos/id/12/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '诸葛亮',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '3',
    title: '这是轮播图示例3',
    cover: 'https://picsum.photos/id/13/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '曹操',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '4',
    title: '是轮播图名称示例4',
    cover: 'https://picsum.photos/id/14/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '小张',
    addTime: '2021.07.01 15:00',
    checked: true,
  },
  {
    key: '5',
    title: '轮播图名称示例5',
    cover: 'https://picsum.photos/id/15/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '金金小张',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '6',
    title: '轮播图名称示例6',
    cover: 'https://picsum.photos/id/16/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '王小样',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '7',
    title: '轮播图名称示例7',
    cover: 'https://picsum.photos/id/17/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '穆一一',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '8',
    title: '轮播图名称示例8',
    cover: 'https://picsum.photos/id/18/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '邓君',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '9',
    title: '轮播图名称示例9',
    cover: 'https://picsum.photos/id/19/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '刘备',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
  {
    key: '10',
    title: '轮播图名称示例10',
    cover: 'https://picsum.photos/id/20/60/40',
    desc: '这里是文章简介的文字描述，最多显示两行所有显示，超出两行则显示...',
    uploader: '关于',
    addTime: '2021.07.01 15:00',
    checked: false,
  },
];

const ArticleManager = () => {
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
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 120,
      },
      {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        width: 60,
        render: (cover) => (
          <img src={cover} alt="文章封面" className="article-cover" />
        ),
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width: 180,
        ellipsis: true, // 超出省略（hover显示完整）
      },
      {
        title: '上传人',
        dataIndex: 'uploader',
        key: 'uploader',
        width: 120,
      },
      {
        title: '添加时间',
        dataIndex: 'addTime',
        key: 'addTime',
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
        <h3 className={styles.listTitle}>文章列表</h3>
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

export default ArticleManager;
