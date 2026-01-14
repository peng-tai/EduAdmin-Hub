import { useEffect, useRef, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd/es/date-picker';
import 'antd/dist/reset.css';
import * as echarts from 'echarts/core';
import type { ECharts, EChartsCoreOption } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册ECharts模块
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
]);

// 自定义Tooltip参数类型
type EchartsTooltipParams = {
  name: string;
  color: string;
  seriesName: string;
  value: number | string;
};

// 1. 定义固定日期键类型
type DateKey = '2020-09-05' | '2020-09-06' | '2020-09-07';
// 2. 为mock数据添加严格类型
const mockDataMap: Record<DateKey, number[]> = {
  '2020-09-05': [600, 150, 750, 600, 600, 150, 900, 450, 450],
  '2020-09-06': [800, 300, 600, 700, 500, 200, 850, 500, 600],
  '2020-09-07': [500, 250, 800, 650, 700, 100, 950, 400, 500],
};

// 时段数据（固定）
const timeAxis = [
  '00:00',
  '03:00',
  '06:00',
  '09:00',
  '12:00',
  '15:00',
  '18:00',
  '21:00',
  '24:00',
];

const PayAmountChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ECharts | null>(null);

  // 改用Dayjs对象存储选中日期
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [chartData, setChartData] = useState<number[]>(
    mockDataMap['2020-09-05'],
  );

  // 图表配置项
  const getOption = (): EChartsCoreOption => {
    return {
      title: {
        text: '实付金额',
        left: '24px',
        top: '24px',
        textStyle: {
          fontSize: 24,
          fontWeight: '600',
        },
      },
      grid: {
        top: 80, // 上边界偏移
        bottom: 48, // 下边界偏移（容纳 x 轴标签）
        left: 64, // 左边界偏移（容纳 y 轴标签）
        right: 64, // 右边界偏移
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: EchartsTooltipParams[]) => {
          if (!params || params.length === 0) return '';
          return `${params[0].name}<br/>实付金额：${params[0].value}`;
        },
      },
      xAxis: {
        type: 'category',
        data: timeAxis,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        axisLabel: {
          interval: 0,
          fontSize: 12,
        },
      },
      yAxis: {
        type: 'value',
        max: 1000,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#eee',
          },
        },
      },
      series: [
        {
          name: '实付金额',
          type: 'bar',
          data: chartData,
          barWidth: 20,
          itemStyle: {
            color: '#52C41A',
            borderRadius: [4, 4, 0, 0],
          },
          label: {
            show: true,
            position: 'top',
            color: '#333',
            fontSize: 12,
          },
        },
      ],
    };
  };

  // 初始化/更新图表
  const initOrUpdateChart = () => {
    if (!chartRef.current) return;
    let chartInstance = chartInstanceRef.current;
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.current);
      chartInstanceRef.current = chartInstance;
    }
    chartInstance.setOption(getOption(), true);
  };

  // 修复：正确处理DatePicker的onChange
  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    if (!date || Array.isArray(date)) return;

    const dateStr = date.format('YYYY-MM-DD') as DateKey;
    const validDateKeys: DateKey[] = ['2020-09-05', '2020-09-06', '2020-09-07'];

    if (validDateKeys.includes(dateStr)) {
      setSelectedDate(date);
      setChartData(mockDataMap[dateStr]);
    } else {
      const defaultDate = dayjs('2020-09-05');
      setSelectedDate(defaultDate);
      setChartData(mockDataMap['2020-09-05']);
    }
  };

  // 生命周期管理
  useEffect(() => {
    initOrUpdateChart();
    const resizeHandler = () => chartInstanceRef.current?.resize();
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, [chartData]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 图表容器 */}
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      {/* Antd日期选择器 + 按钮 */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12 }}>日期</span>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          style={{ width: 120 }}
          size="small"
        />
      </div>
    </div>
  );
};

export default PayAmountChart;
