import LessonTable from "./LessonTable"
import OrderTable from "./OrderTable"
import TutorNeedTable from "./TutorNeedTable"
import ReactEcharts from 'echarts-for-react'

const OrderManage = () => {
    
    const orderData = [5, 20, 36, 10, 10, 20, 15, 25, 30, 45, 50, 60];
    const needsData = [15, 30, 46, 20, 20, 30, 25, 35, 40, 55, 60, 70];
    
    const optionForON = {
        legend: {
          data: ['User Needs', 'Orders'],
          top: 10,
          textStyle: {
            color: '#333',
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999',
                width: 1,
                type: 'dashed',
            },
          },
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Tooltip 背景颜色
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#333',
            },
          },
          axisLabel: {
            color: '#333',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#333',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(150, 150, 150, 0.1)',
            },
          },
          axisLabel: {
            color: '#333',
          },
        },
        series: [
          {
            name: 'User Needs',
            type: 'bar',
            data: needsData,
          },
          {
            name: 'Orders',
            type: 'bar',
            data: orderData,
          },
        ],
        animationDuration: 1000, // 动画持续时间
        animationEasing: 'cubicOut', // 动画缓动效果
      };

    const perPage = 3;
    return (
        <div className="flex flex-col p-4 space-y-4">
            {/* -----显示大致的统计信息----- */}
            <div className="flex flex-row justify-evenly space-x-4">
                {/* 用户需求，订单的柱状图 */}
                <div className="flex-1 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-4 text-center">User Needs and Orders</h2>
                    <ReactEcharts option={optionForON} style={{ width: '100%', height: '215px' }} />
                </div>
            </div>
    
            {/* -----包含订单数据的表格----- */}    
            <div className="bg-white rounded shadow">
                <div role="tablist" className="tabs tabs-bordered">
                    <input type="radio" name="my_tabs_1" role="tab" 
                      className="tab font-mono font-semibold text-lg" aria-label="Tutor Needs" checked/>
                    <div role="tabpanel" className="tab-content p-10">
                        <TutorNeedTable perPage={perPage}/>
                    </div>

                    <input type="radio" name="my_tabs_1" role="tab" 
                      className="tab font-mono font-semibold text-lg" aria-label="Orders"/>
                    <div role="tabpanel" className="tab-content p-10">
                        <OrderTable perPage={perPage}/>
                    </div>

                    <input type="radio" name="my_tabs_1" role="tab" 
                      className="tab font-mono font-semibold text-lg" aria-label="Lessons"/>
                    <div role="tabpanel" className="tab-content p-10">
                        <LessonTable perPage={perPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManage