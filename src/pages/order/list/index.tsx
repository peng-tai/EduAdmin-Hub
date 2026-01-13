import React from 'react';
import styles from './index.module.scss';
import { Button, Table, type TableColumnsType, type TableProps } from 'antd';

interface DataType {
  key: React.Key;
  id?: string;
  name?: string;
  phone?: number;
  course_name?: string;
  order_amount?: number;
  order_status?: string;
  update_time?: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '订单编号',
    dataIndex: 'id',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '用户昵称',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '课程名称',
    dataIndex: 'course_name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '订单金额',
    dataIndex: 'order_amount',
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
  },
  {
    title: '提交时间',
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
    phone: 15800000001,
    order_amount: 99.0,
    order_status: '待支付',
    course_name: 'New York 1',
  },
  {
    key: '2',
    id: 'code0002',
    name: 'John Brown',
    phone: 15800000002,
    order_amount: 99.0,
    order_status: '已关闭',
    course_name: 'New York 1',
  },
  {
    key: '3',
    id: 'code0003',
    name: 'John Brown',
    phone: 15800000003,
    order_amount: 99.0,
    order_status: '待支付',
    course_name: 'New York 2',
  },
  {
    key: '4',
    id: 'code0004',
    name: 'John Brown',
    phone: 15800000004,
    order_amount: 99.0,
    order_status: '已支付',
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

const OrderList = () => {
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

export default OrderList;
