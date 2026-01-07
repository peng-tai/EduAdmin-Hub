import React, { useState } from 'react';
import styles from './index.module.scss';

import { Button } from 'antd';

const Login = () => {
  const [account, setAccount] = useState('');
  const handleRegister = () => {
    console.log('register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        {account}
        <div className={styles.leftBox}>
          <div className={styles.leftHeader}>教育管理系统</div>

          <div className={styles.leftContent}>
            <div className={styles.welcome}>欢迎回来</div>
            <div className={styles.platformInfo}>
              这是管理系统介绍，一个让更多人收益的教育平台
            </div>
            <Button className={styles.register} onClick={handleRegister}>
              没账号，去注册
            </Button>
          </div>
        </div>
        <div className={styles.rightBox}></div>
      </div>
    </div>
  );
};

export default Login;
