import { useState } from 'react';
import { DatePicker, type DatePickerProps } from 'antd';
import styles from './index.module.scss';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// 学员数据类型
interface Student {
  id: number;
  avatar: string;
  name: string;
  studentId: string;
  percent: number;
}

// 模拟学员数据
const studentData: Student[] = [
  {
    id: 1,
    avatar: 'https://picsum.photos/id/64/40/40', // 占位头像（可替换为真实图片）
    name: '小仓鼠的老房子',
    studentId: '学号：2071#H-M6',
    percent: 95,
  },
  {
    id: 2,
    avatar: 'https://picsum.photos/id/237/40/40',
    name: '松狸男美',
    studentId: '学号：2071#H-M6',
    percent: 50,
  },
  {
    id: 3,
    avatar: 'https://picsum.photos/id/1005/40/40',
    name: '是个勇士',
    studentId: '学号：2071#H-M6',
    percent: 88,
  },
  {
    id: 4,
    avatar: 'https://picsum.photos/id/1012/40/40',
    name: '南方有佳木',
    studentId: '学号：2071#H-M6',
    percent: 45,
  },
  {
    id: 5,
    avatar: 'https://picsum.photos/id/1025/40/40',
    name: '金金小张',
    studentId: '学号：2071#H-M6',
    percent: 60,
  },
  {
    id: 6,
    avatar: 'https://picsum.photos/id/1074/40/40',
    name: '咖哩酱',
    studentId: '学号：2071#H-M6',
    percent: 25,
  },
];

const ActiveStudents = () => {
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
    <div className={styles.activeStudents}>
      {/* 标题+日期区域 */}
      <div className={styles.header}>
        <div className={styles.title}>活跃学员</div>
        <div className={styles.dateWrapper}>
          <span>日期</span>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            size="small"
            style={{ width: 120 }}
          />
        </div>
      </div>

      {/* 学员列表 */}
      <div className={styles.studentList}>
        {studentData.map((student) => (
          <div key={student.id} className={styles.studentItem}>
            {/* 头像 */}
            <img
              src={student.avatar}
              alt={student.name}
              className={styles.avatar}
            />

            {/* 信息+进度条 */}
            <div className={styles.infoWrapper}>
              <div className={styles.name}>{student.name}</div>
              <div className={styles.studentId}>{student.studentId}</div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${student.percent}%` }}
                />
              </div>
            </div>

            {/* 百分比 */}
            <div className={styles.percent}>{student.percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveStudents;
