import React from 'react';

import styles from './index.module.scss';
import TimeDistributionChart from './TimeDistributionChart';
import PayAmountChart from './PayAmountChart';
import ActiveStudents from './ActiveStudents';
import RealTimeOverview from './RealTimeOverview';
import {
  FileTextOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

const Home = () => {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <div
          className={styles.card}
          style={{
            background: 'linear-gradient(#70e8c9, #a9e8e5)',
          }}
        >
          <div className={styles.left}>
            <PayCircleOutlined className={styles.icon} />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>今日订单输入</div>
            <div className={styles.num}>¥6668.88</div>
            <div className={styles.desc}>+1.2% 同昨日比</div>
          </div>
        </div>
        <div
          className={styles.card}
          style={{
            background: 'linear-gradient(#D067CB, #D966D3)',
          }}
        >
          <div className={styles.left}>
            <FileTextOutlined className={styles.icon} />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>今日订单数量</div>
            <div className={styles.num}>812</div>
            <div className={styles.desc}>+2.7% 同昨日比</div>
          </div>
        </div>
        <div
          className={styles.card}
          style={{
            background: 'linear-gradient(#FDB06E, #FC9652)',
          }}
        >
          <div className={styles.left}>
            <UsergroupAddOutlined className={styles.icon} />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>今日访客数</div>
            <div className={styles.num}>323</div>
            <div className={styles.desc}>+1.1% 同昨日比</div>
          </div>
        </div>
        <div
          className={styles.card}
          style={{
            background: 'linear-gradient(#FC8882, #FE716D)',
          }}
        >
          <div className={styles.left}>
            <PercentageOutlined className={styles.icon} />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>支付转化率</div>
            <div className={styles.num}>10%</div>
            <div className={styles.desc}>+1.5% 同昨日比</div>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <div className={styles.time}>
          <TimeDistributionChart />
        </div>
        <div className={styles.gold}>
          <PayAmountChart />
        </div>
      </div>

      <div className={styles.chart}>
        <div className={styles.time}>
          <ActiveStudents />
        </div>
        <div className={styles.gold}>
          <RealTimeOverview></RealTimeOverview>
        </div>
      </div>
    </div>
  );
};

export default Home;
