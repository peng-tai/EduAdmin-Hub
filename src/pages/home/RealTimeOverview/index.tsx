import React, { useState } from 'react';
import { DatePicker, type DatePickerProps } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// 统计项类型
interface StatItem {
  id: number;
  label: string;
  value: number;
  compare: string; // 同比/昨日数据
  icon: React.ReactNode;
  iconBgType: 'orange' | 'green' | 'yellow' | 'blue';
}

// 模拟统计数据
const statData: StatItem[] = [
  {
    id: 1,
    label: '学员数',
    value: 84,
    compare: '同比天对比: +1.2% 昨日 78',
    icon: <UserOutlined />,
    iconBgType: 'orange',
  },
  {
    id: 2,
    label: '教师数',
    value: 12,
    compare: '同比天对比: -1.2% 昨日 100+',
    icon: <UserOutlined />,
    iconBgType: 'green',
  },
  {
    id: 3,
    label: '视频数',
    value: 132,
    compare: '同比天对比: +1.2% 昨日 78',
    icon: <VideoCameraOutlined />,
    iconBgType: 'yellow',
  },
  {
    id: 4,
    label: '资讯数',
    value: 284,
    compare: '同比天对比: +1.2% 昨日 100+',
    icon: <FileTextOutlined />,
    iconBgType: 'blue',
  },
];

const RealTimeOverview = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  // 日期选择器回调（可根据需求扩展）
  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    if (!date || Array.isArray(date)) {
      return;
    }
    setSelectedDate(date);
    console.log('选中日期：', date.format('YYYY-MM-DD'));
  };


  return (
    <div className={styles.realTimeOverview}>
      {/* 标题+日期区域 */}
      <div className={styles.header}>
        <div className={styles.title}>实时概况</div>
        <div className={styles.dateWrapper}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            size="small"
            style={{ width: 120 }}
          />
        </div>
      </div>

      {/* 统计卡片网格 */}
      <div className={styles.cardGrid}>
        {statData.map((item) => (
          <div key={item.id} className={styles.statCard}>
            {/* 带背景色的图标 */}
            <div className={`${styles.iconWrapper} ${styles[item.iconBgType]}`}>
              {item.icon}
            </div>

            {/* 文本信息 */}
            <div className={styles.infoWrapper}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.value}>{item.value}</div>
              <div className={styles.compare}>{item.compare}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeOverview;
