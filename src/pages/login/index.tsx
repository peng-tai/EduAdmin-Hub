import React, { useState } from 'react';
import styles from './index.module.scss';

const Login = () => {
  const [account, setAccount] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {account}
        <div className={styles.leftBox}>
          <div className={styles.leftHeader}>logo</div>

          <div className={styles.leftContent}>
            <div className={styles.welcome}>欢迎回来</div>
            <div className={styles.platformInfo}>这是管理系统介绍，一个让更多人收益的教育平台</div>
            <div className={styles.register}>去注册账号</div>
          </div>
        </div>
        <div className={styles.rightBox}></div>
      </div>
    </div>
  );
};

export default Login;
