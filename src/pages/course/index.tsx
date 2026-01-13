import React from 'react';
import styles from './index.module.scss';
import { Button, Table, type TableColumnsType, type TableProps } from 'antd';

interface DataType {
  key: React.Key;
  id?: string;
  name?: string;
  cover?: number;
  course_name?: string;
  status?: string;
  order_num?: number;
  order_amount?: number;
  update_user?: string;
  update_time?: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '编号',
    dataIndex: 'id',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '名称',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '封面',
    dataIndex: 'cover',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '状态',
    dataIndex: 'stauts',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '价格',
    dataIndex: 'order_amount',
  },
  {
    title: '销量',
    dataIndex: 'order_num',
  },
  {
    title: '上传人',
    dataIndex: 'update_user',
  },
  {
    title: '上传时间',
    dataIndex: 'update_time',
  },
  {
    title: '操作',
    dataIndex: 'operator',
    render: () => {
      return (
        <div>
          <div>查看</div>
          <div>删除</div>
        </div>
      );
    },
  },
];

const data: DataType[] = [
  {
    key: '1',
    id: 'code0001',
    name: 'John Brown',
    order_amount: 99.0,
    status: '待支付',
    course_name: 'New York 1',
  },
  {
    key: '2',
    id: 'code0002',
    name: 'John Brown',
    order_amount: 99.0,
    status: '已关闭',
    course_name: 'New York 1',
  },
  {
    key: '3',
    id: 'code0003',
    name: 'John Brown',
    order_amount: 99.0,
    status: '待支付',
    course_name: 'New York 2',
  },
  {
    key: '4',
    id: 'code0004',
    name: 'John Brown',
    order_amount: 99.0,
    status: '已支付',
    course_name: 'New York 3',
  },
];

const rowSelection: TableProps<DataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const Course = () => {
  return (
    <div className={styles.content}>
      <div className={styles.select}>
        <div>上传时间</div>
        <div>上架状态</div>
        <div>上传人</div>
        <div>手动搜索</div>
        <Button>搜索</Button>
        <Button>重置</Button>
      </div>
      <div className={styles.list}>
        <Table<DataType>
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default Course;
