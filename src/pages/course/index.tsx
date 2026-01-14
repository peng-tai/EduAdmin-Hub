import React, { useMemo, useState } from 'react';
import styles from './index.module.scss';
import { Checkbox, Space, Table } from 'antd';
import SearchBar from './SearchBar';

interface DataType {
  key: React.Key;
  id?: string;
  name?: string;
  code?: string;
  cover?: string;
  course_name?: string;
  status?: string;
  order_num?: number;
  order_amount?: number;
  update_user?: string;
  update_time?: number;
  price?: string;
  sales?: string;
  uploader?: string;
  uploadTime?: string;
}

// 模拟课程数据
const mockCourseData = [
  {
    key: '1',
    code: 'CODE001',
    name: '教程名称文字示例1',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYe9WcCUsNXtp4rUN1YD_1uz87xhvVVEd2cxq_Oyg9LPkS1T5AgKmbUaR32Wt2X7XL-8&usqp=CAU',
    status: '上架',
    price: '88.00',
    sales: '640',
    uploader: '金金',
    uploadTime: '2021.07.01 15:00',
  },
  {
    key: '2',
    code: 'CODE002',
    name: '如果超出八个字显...',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYe9WcCUsNXtp4rUN1YD_1uz87xhvVVEd2cxq_Oyg9LPkS1T5AgKmbUaR32Wt2X7XL-8&usqp=CAU',
    status: '上架',
    price: '128.00',
    sales: '128',
    uploader: '诸葛亮',
    uploadTime: '2021.07.01 15:00',
  },
  {
    key: '3',
    code: 'CODE003',
    name: '教程名称文字示例1',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYe9WcCUsNXtp4rUN1YD_1uz87xhvVVEd2cxq_Oyg9LPkS1T5AgKmbUaR32Wt2X7XL-8&usqp=CAU',
    status: '上架',
    price: '88.00',
    sales: '640',
    uploader: '金金',
    uploadTime: '2021.07.01 15:00',
  },
  {
    key: '4',
    code: 'CODE004',
    name: '如果超出八个字显...',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYe9WcCUsNXtp4rUN1YD_1uz87xhvVVEd2cxq_Oyg9LPkS1T5AgKmbUaR32Wt2X7XL-8&usqp=CAU',
    status: '上架',
    price: '128.00',
    sales: '128',
    uploader: '诸葛亮',
    uploadTime: '2021.07.01 15:00',
  },
  {
    key: '5',
    code: 'CODE005',
    name: '教程名称文字示例1',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYe9WcCUsNXtp4rUN1YD_1uz87xhvVVEd2cxq_Oyg9LPkS1T5AgKmbUaR32Wt2X7XL-8&usqp=CAU',
    status: '上架',
    price: '88.00',
    sales: '640',
    uploader: '金金',
    uploadTime: '2021.07.01 15:00',
  },
  {
    key: '6',
    code: 'CODE006',
    name: '如果超出八个字显...',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYe9WcCUsNXtp4rUN1YD_1uz87xhvVVEd2cxq_Oyg9LPkS1T5AgKmbUaR32Wt2X7XL-8&usqp=CAU',
    status: '上架',
    price: '128.00',
    sales: '128',
    uploader: '诸葛亮',
    uploadTime: '2021.07.01 15:00',
  },
];

const Course = () => {
  // 全选状态管理
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  // 表格列配置（包含全选表头）
  const columns = useMemo(
    () => [
      {
        title: (
          <Checkbox
            checked={allChecked}
            onChange={(e) => {
              setAllChecked(e.target.checked);
              // 全选/取消全选：选中所有行key
              setSelectedRowKeys(
                e.target.checked ? mockCourseData.map((item) => item.key) : [],
              );
            }}
            className={styles.checkboxHeader}
          />
        ),
        dataIndex: 'key',
        render: (_: unknown, record: DataType) => (
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => {
              const newSelected = [...selectedRowKeys];
              if (e.target.checked) {
                newSelected.push(record.key);
              } else {
                const index = newSelected.indexOf(record.key);
                newSelected.splice(index, 1);
              }
              setSelectedRowKeys(newSelected);
              // 同步全选状态
              setAllChecked(newSelected.length === mockCourseData.length);
            }}
          />
        ),
        width: 40,
      },
      { title: '编号', dataIndex: 'code', width: 120 },
      { title: '名称', dataIndex: 'name', width: 200 },
      {
        title: '封面',
        dataIndex: 'cover',
        width: 90,
        render: (cover: string) => (
          <img src={cover} alt="封面" className={styles.coverImg} />
        ),
      },
      { title: '状态', dataIndex: 'status', width: 100 },
      { title: '价格', dataIndex: 'price', width: 100 },
      { title: '销量', dataIndex: 'sales', width: 100 },
      { title: '上传人', dataIndex: 'uploader', width: 140 },
      { title: '上传时间', dataIndex: 'uploadTime', width: 240 },
      {
        title: '操作',
        width: 200,
        render: (_: unknown, record: DataType) => (
          <Space>
            <a className={styles.editLink}>编辑</a>
            <a
              className={
                record.status === '上架' ? styles.downLink : styles.upLink
              }
            >
              {record.status === '上架' ? '下架' : '上架'}
            </a>
            <a className={styles.deleteLink}>删除</a>
          </Space>
        ),
      },
    ],
    [selectedRowKeys, allChecked],
  );
  return (
    <div className={styles.content}>
      <div className={styles.select}>
        <SearchBar></SearchBar>
      </div>
      <div className={styles.list}>
        <div className={styles.name}>课程列表</div>
        <Table
          columns={columns}
          dataSource={mockCourseData}
          pagination={false}
          bordered
          className={styles.table}
          rowKey="key"
        />
      </div>
    </div>
  );
};

export default Course;
