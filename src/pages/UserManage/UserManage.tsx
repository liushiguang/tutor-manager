import { title } from "process";
import SignOnTable from "./SignOnTable"
import TeacherInfoTable from "./TeacherInfoTable"
import UserInfoTable from "./UserInfoTable"
import ReactEcharts from 'echarts-for-react';
import { text } from "stream/consumers";

const UserManage = () => {

    const locationCategory: {[key: string]: number} = {
        "Hunan ChangSha" : 25,
        "Huber Wuhan" : 15,
        "Henan ZhengZhou" : 10,
        "JiangSu NanJing" : 9,
        "ZheJiang HangZhou" : 5,
        "BeiJing" : 27,
        "ShangHai" : 23,
        "ShenZhen" : 26,
        "GuangZhou" : 30,
    }
    // echarts 饼状图配置项
    const pieChartData = Object.keys(locationCategory).map((key: string) => ({name: key, value: locationCategory[key]}))
    const optionForLocation = {
        title: {
            // text: 'User Location Distribution',
            // top: '5%',
            left: 'center',
            // 主标题样式
            textStyle: {
                fontWeight: 'normal',
                fontSize: 18
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: 'Map',
                type: 'pie',
                radius: '50%',
                center: ['50%', '45%'],
                label: {
                    formatter: '{b}: {d}%',
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                labelLine: {
                    length: 10,
                    length2: 15
                },
                itemStyle: { // 美化每个扇形块的样式
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                emphasis: { // 高亮样式
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: pieChartData,
                // 添加颜色配置
                color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC']
            }
        ]
    };

    const teacherChartData = {
        legend: ['Male', 'Female'],
        indicators: [
          { name: 'High School', max: 100 },
          { name: 'Associate Degree', max: 100 },
          { name: "Bachelor's Degree", max: 100 },
          { name: "Master's Degree", max: 100 },
          { name: "Doctoral Degree", max: 100 }
        ],
        series: [
          {
            name: 'Male',
            value: [70, 80, 90, 85, 75]
          },
          {
            name: 'Female',
            value: [60, 70, 80, 70, 65]
          }
        ],
        colors: ['#6CB2EB', '#FF9F7F'] // 自定义颜色
      };

    const optionForTeacher = {
        title: {
            // text: '家教教师学历雷达图',
            left: 'center',
            textStyle: {
              fontSize: 24,
              color: '#333'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: 0,
            data: teacherChartData.legend,
            textStyle: {
              fontSize: 16,
              color: '#333'
            }
          },
          radar: {
            shape: 'circle',
            indicator: teacherChartData.indicators,
            axisName: {
              color: '#666',
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                color: ['#ddd', '#ccc', '#bbb', '#aaa', '#999'],
                width: 1
              }
            },
            splitArea: {
              areaStyle: {
                color: ['rgba(255, 255, 255, 0.5)', 'rgba(200, 200, 200, 0.5)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#bbb'
              }
            }
          },
          series: [{
            name: '学历分布',
            type: 'radar',
            data: teacherChartData.series.map((series, index) => ({
              value: series.value,
              name: series.name,
              itemStyle: {
                color: teacherChartData.colors[index]
              },
              areaStyle: {
                opacity: 0.3
              }
            }))
          }]
        };

        const activityData = [
          {
            value: 10,
            name: '00:00-06:00',
            itemStyle: {
              color: 'rgba(255, 99, 132, 0.8)',
            },
          },
          {
            value: 25,
            name: '06:00-12:00',
            itemStyle: {
              color: 'rgba(54, 162, 235, 0.8)',
            },
          },
          {
            value: 35,
            name: '12:00-18:00',
            itemStyle: {
              color: 'rgba(255, 206, 86, 0.8)',
            },
          },
          {
            value: 30,
            name: '18:00-24:00',
            itemStyle: {
              color: 'rgba(75, 192, 192, 0.8)',
            },
          },
        ]

        const optionForActivity = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
              color: '#333', // 图例文字颜色
            },
          },
          series: [
            {
              name: 'User Activity',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: true,
                position: 'inside',
                formatter: '{b} : {c} ({d}%)',
                textStyle: {
                  fontSize: 14,
                  fontWeight: 'bold',
                },
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '16',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: true,
              },
              data: activityData,
            },
          ],
        };

    const perPage = 3;

    return (
        <div className="flex flex-col p-4 space-y-4">
        {/* -----显示大致的统计信息----- */}
        <div className="flex flex-row justify-evenly space-x-4">
          {/* 用户地区分布图 - 按照不同颜色进行区分 */}
          <div className="flex-1 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">User Location Distribution</h2>
            <ReactEcharts option={optionForLocation} style={{ width: '100%', height: '230px' }} />
          </div>
          {/* 家教教师学历雷达图 - 高中、专科、本科、硕士、博士 - 性别 */}
          <div className="flex-1 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Teacher Education Qualifications Distribution</h2>
            <ReactEcharts option={optionForTeacher} style={{ width: '100%', height: '230px' }} />
          </div>
          {/* 环状图 */}
          <div className="flex-1 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">User Activity Duration</h2>
            <ReactEcharts option={optionForActivity} style={{ width: '100%', height: '230px' }} />
            </div>
        </div>
  
        {/* -----包含用户数据的表格----- */}
        <div className="bg-white rounded shadow">
          <div role="tablist" className="tabs tabs-lifted">
            <input type="radio" name="my_tabs_1" id="tab1" role="tab" 
                className="tab font-mono font-semibold text-lg" aria-label="SignOn Table" defaultChecked />
            <div role="tabpanel" className="tab-content p-4">
              <SignOnTable perPage={perPage}/>
            </div>
  
            <input type="radio" name="my_tabs_1" id="tab2" role="tab" 
                className="tab font-mono font-semibold text-lg" aria-label="Teacher Table" />
            <div role="tabpanel" className="tab-content p-4 hidden">
              <TeacherInfoTable perPage={perPage}/>
            </div>

            <input type="radio" name="my_tabs_1" id="tab3" role="tab" 
                className="tab font-mono font-semibold text-lg" aria-label="User Table" />
            <div role="tabpanel" className="tab-content p-4 hidden">
              <UserInfoTable perPage={perPage}/>
            </div>

          </div>
        </div>
      </div>
    )
}

export default UserManage