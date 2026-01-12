import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';

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
      <div className={styles.list}></div>
    </div>
  );
};

export default Course;
