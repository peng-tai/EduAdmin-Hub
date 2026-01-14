import React, { useEffect, useRef } from 'react';
// 按需引入ECharts模块 + 导入类型定义
import * as echarts from 'echarts/core';
import type { ECharts, EChartsCoreOption } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册模块
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

type EchartsTooltipParams = {
  name: string; // X轴名称（如时段）
  color: string; // 系列颜色
  seriesName: string; // 系列名称（访客量/成交量）
  value: number | string; // 数值
  [key: string]: unknown; // 兼容其他扩展属性
};

const TimeDistributionChart = () => {
  // 1. 图表容器ref
  const chartRef = useRef<HTMLDivElement>(null);

  // 2. 用useRef存储ECharts实例（替代普通变量，避免渲染后赋值警告）
  const chartInstanceRef = useRef<ECharts | null>(null);

  // 模拟数据
  const chartData = {
    xAxis: [
      '01:00',
      '03:00',
      '05:00',
      '07:00',
      '09:00',
      '11:00',
      '13:00',
      '15:00',
      '17:00',
      '19:00',
      '21:00',
      '23:00',
    ],
    visitor: [200, 300, 180, 350, 450, 300, 150, 200, 300, 250, 300, 700],
    deal: [600, 150, 400, 300, 350, 280, 500, 150, 200, 600, 750, 150],
  };

  // 图表配置项
  const getOption = (): EChartsCoreOption => {
    return {
      title: {
        text: '时段分布',
        left: '24px',
        top: '24px',
        textStyle: {
          fontSize: 24,
          fontWeight: '600',
        },
      },
      legend: {
        data: ['访客量', '成交量'],
        left: '180px',
        top: '28px',
        itemWidth: 12,
        itemHeight: 12,
      },
      grid: {
        outerBounds:{
          top: 80, // 上边界偏移
          bottom: 0, // 下边界偏移（容纳 x 轴标签）
          left: -24, // 左边界偏移（容纳 y 轴标签）
          right: -24, // 右边界偏移  
        }
      },
        tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: EchartsTooltipParams[]) => {
          if (!params || params.length === 0) return '';
          return (
            params[0].name +
            '<br/>' +
            params
              .map(
                (item) =>
                  `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>${item.seriesName}：${item.value}`,
              )
              .join('<br/>')
          );
        },
      },
      xAxis: {
        type: 'category',
        data: chartData.xAxis,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
      },
      yAxis: {
        type: 'value',
        max: 800,
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
          name: '访客量',
          type: 'line',
          data: chartData.visitor,
          smooth: true,
          lineStyle: {
            color: '#F7D04D',
            width: 2,
          },
          itemStyle: {
            color: '#F7D04D',
          },
          symbol: 'circle',
          symbolSize: 6,
        },
        {
          name: '成交量',
          type: 'line',
          data: chartData.deal,
          smooth: true,
          lineStyle: {
            color: '#4080FF',
            width: 2,
          },
          itemStyle: {
            color: '#4080FF',
          },
          symbol: 'circle',
          symbolSize: 6,
          label: {
            show: true,
            position: 'top',
            color: '#333',
          },
        },
      ],
    };
  };

  // 初始化/更新图表
  const initChart = () => {
    if (!chartRef.current) return;

    // 从ref中获取实例
    let chartInstance = chartInstanceRef.current;
    if (!chartInstance) {
      // 初始化实例并存储到ref
      chartInstance = echarts.init(chartRef.current);
      chartInstanceRef.current = chartInstance;
    }

    chartInstance.setOption(getOption());
  };

  // 生命周期管理
  useEffect(() => {
    initChart();

    // 窗口自适应
    const resizeHandler = () => {
      chartInstanceRef.current?.resize();
    };
    window.addEventListener('resize', resizeHandler);

    // 组件卸载清理
    return () => {
      window.removeEventListener('resize', resizeHandler);
      // 销毁实例并清空ref
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default TimeDistributionChart;
