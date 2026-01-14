import { useState } from 'react';
import styles from './index.module.scss';

import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const handleRegister = () => {
    console.log('register');
  };

  const handleLogin = () => {
    navigate('/home');
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
        <div className={styles.rightBox}>
          <div className={styles.rightContent}>
            <div className={styles.rightTitle}>后台登录</div>
            <Input placeholder="请输入用户名" className={styles.rightInput} />
            <Input placeholder="请输入密码" className={styles.rightInput} />
            <Input placeholder="请输入验证码" className={styles.rightInput} />
            <Button className={styles.loginBtn} onClick={handleLogin}>
              现在登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
