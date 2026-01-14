import { useState } from 'react';
import { DatePicker, Select, Input, Button, Space } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import styles from './index.module.scss';

const { RangePicker } = DatePicker;

const SearchBar = () => {
  // 状态管理
  const [searchParams, setSearchParams] = useState<{
    timeRange: [Dayjs | null | undefined, Dayjs | null | undefined] | [];
    shelfStatus: string;
    uploader: string;
    keyword: string;
  }>({
    timeRange: [],
    shelfStatus: '',
    uploader: '',
    keyword: '',
  });

  // 时间范围变化
  const handleTimeChange = (dates: [Dayjs | null | undefined, Dayjs | null | undefined] | null) => {
    setSearchParams({ ...searchParams, timeRange: dates ? dates : [] });
  };

  // 下拉选择变化
  const handleSelectChange = (value: string, type: string) => {
    setSearchParams({ ...searchParams, [type]: value });
  };

  // 关键词输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, keyword: e.target.value });
  };

  // 搜索操作
  const handleSearch = () => {
    console.log('搜索参数：', searchParams);
    // 这里可以添加接口请求逻辑
  };

  // 重置操作
  const handleReset = () => {
    setSearchParams({
      timeRange: [],
      shelfStatus: '',
      uploader: '',
      keyword: '',
    });
  };

  return (
    <div className={styles['search-bar-container']}>
      <div className={styles['search-bar-item']}>
        <span className={styles['search-label']}>上传时间</span>
        <RangePicker
          format="YYYY-MM-DD"
          value={searchParams.timeRange && searchParams.timeRange.length === 2 ? (searchParams.timeRange as [Dayjs, Dayjs]) : null}
          onChange={handleTimeChange}
          className={styles['search-range-picker']}
        />
      </div>

      <div className={styles['search-bar-item']}>
        <span className={styles['search-label']}>上架状态</span>
        <Select
          placeholder="请选择"
          value={searchParams.shelfStatus}
          onChange={(val) => handleSelectChange(val, 'shelfStatus')}
          className={styles['search-select']}
        />
      </div>

      <div className={styles['search-bar-item']}>
        <span className={styles['search-label']}>上传人</span>
        <Select
          placeholder="请选择"
          value={searchParams.uploader}
          onChange={(val) => handleSelectChange(val, 'uploader')}
          className={styles['search-select']}
        />
      </div>

      <div className={`${styles['search-bar-item']} ${styles['search-keyword-group']}`}>
        <span className={styles['search-label']}>手动搜索</span>
        <Input
          placeholder="请输入标题或者关键字"
          value={searchParams.keyword}
          onChange={handleInputChange}
          className={styles['search-input']}
        />
        <Space className={styles['search-btn-group']}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            className={styles['search-btn']}
          >
            搜索
          </Button>
          <Button
            icon={<RedoOutlined />}
            onClick={handleReset}
            className={styles['reset-btn']}
          >
            重置
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default SearchBar;