import avatar from '@/resources/backstage/user.svg'
import views from '@/resources/backstage/views.svg'
import students from '@/resources/backstage/students.svg'
import teachers from '@/resources/backstage/teachers.svg'
import { format, getDay, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import classNames from 'classnames';
import { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { color } from 'echarts';

interface SystemLog {
    id: number;
    action: string;
    time: string;
    user: string;
    description: string;
}

interface Props {
    logs: SystemLog[];
}

const SystemLogTable: React.FC<Props> = ({ logs }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-white text-lg">
              <th className="py-2 px-4">操作类型</th>
              <th className="py-2 px-4">操作时间</th>
              <th className="py-2 px-4">操作人员</th>
              <th className="py-2 px-4">详细描述</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="text-sm">
                <td className="border px-4 py-2">{log.action}</td>
                <td className="border px-4 py-2">{log.time}</td>
                <td className="border px-4 py-2">{log.user}</td>
                <td className="border px-4 py-2">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
  
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });

    const firstDayOfMonth = getDay(startOfMonth(currentDate));

    const handlePrevMonth = () => {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    };
  
    const handleNextMonth = () => {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    };
  
    return (
        <div className="container mx-auto p-3 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-3">
                <button onClick={handlePrevMonth} className="glass px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                  Prev
                </button>
                <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth} className="glass px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                  Next
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-gray-800">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold">{day}</div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} />
                ))}
                {daysInMonth.map(day => (
                <div
                  className={classNames("text-center py-2 rounded-md cursor-pointer hover:bg-slate-400 hover:text-white transition-colors duration-300 ease-in-out glass",
                    {
                    'bg-gray-200': !isSameMonth(day, currentDate),
                    'bg-blue-500 text-white': isSameDay(day, new Date())}
                    )}>
                    {format(day, 'd')}
                </div>
                ))}
            </div>
        </div>
    );
  };


const TeacherCard = (props : any) => {
    const {teacherName, teacherRank, teacherAvatar, teacherEducation} = props
    return (
        <div className='flex flex-col text-center border-4 rounded-2xl overflow-auto border-b-indigo-500'>
            {/* 头像 */}
            <div className='w-full bg-center rounded-t-2xl' style={{backgroundImage: "url(https://images.unsplash.com/photo-1554629947-334ff61d85dc)"}}>
                <div className="avatar my-5">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        {/* <img src={teacherAvatar} /> */}
                    </div>
                </div>  
            </div>
            {/* 信息 */}
            <div className='grow flex justify-center items-center border-t-4 border-zinc-400/50 rounded-lg bg-sky-50/25'>
                <ul className='space-y-1 sm:space-y-1 md:space-y-4 lg:space-y-6'>
                    <li className='text-2xl font-sans'>{teacherName}</li>
                    <li className='text-lg font-sans'>{teacherEducation}</li>
                    <li className='font-mono'>Master's graduate passionate about tutoring. Tailored, supportive approach. Committed to student success and fostering a love for learning.</li>
                    <li className='font-mono'>Rank: {teacherRank} stars</li>
                </ul>
            </div>
        </div>
    )
}

const Dashboard = () => {

    const [studentNum, teacherNum] = [689, 511]  
    // const recruitmentNum = [150, 232, 201, 154, 190, 330, 410]
    // const applicationNum = [220, 182, 191, 234, 290, 330, 310]
    // const dealNum = [30, 45, 53, 54, 65, 78, 82]

    // const orderOption = {
    //     title: {
    //         text: 'Order & Deal',
    //         left: 'center',
    //         top: '10%',
    //         textStyle: {
    //             fontWeight: 'normal',
    //             fontSize: 24
    //         }
    //     },
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'cross',
    //             crossStyle: {
    //                 color: '#999'
    //             }
    //         }
    //     },
    //     legend: {
    //         data: ['Recruitment', 'Application', 'Deal'],
    //         top: '85%',
    //         textStyle: {
    //             fontSize: 14
    //         }
    //     },
    //     xAxis: [{
    //         type: 'category',
    //         data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    //         axisPointer: {
    //             type: 'shadow'
    //         },
    //         axisLabel: {
    //             fontSize: 14
    //         }
    //     }],
    //     yAxis: [{
    //             type: 'value',
    //             name: 'Numbers',
    //             min: 0,
    //             max: 250,
    //             interval: 50,
    //             axisLabel: {
    //                 formatter: '{value}',
    //                 fontSize: 14
    //             }
    //         },
    //         {
    //             type: 'value',
    //             name: 'Deal',
    //             min: 0,
    //             max: 150,
    //             interval: 30,
    //             axisLabel: {
    //                 formatter: '{value}',
    //                 fontSize: 14
    //             }
    //         }
    //     ],
    //     series: [{
    //             name: 'Recruitment',
    //             type: 'bar',
    //             data: recruitmentNum,
    //             itemStyle: {
    //                 color: '#6CB2EB' // 自定义柱状图颜色
    //             }
    //         },
    //         {
    //             name: 'Application',
    //             type: 'bar',
    //             data: applicationNum,
    //             itemStyle: {
    //                 color: '#FF9F7F' // 自定义柱状图颜色
    //             }
    //         },
    //         {
    //             name: 'Deal',
    //             type: 'line',
    //             yAxisIndex: 1,
    //             data: dealNum,
    //             itemStyle: {
    //                 color: '#66CC99' // 自定义线条颜色
    //             },
    //             lineStyle: {
    //                 width: 2 // 自定义线条粗细
    //             },
    //             symbol: 'circle', // 自定义数据点形状
    //             symbolSize: 8 // 自定义数据点大小
    //         }
    //     ]
    // };

    const satOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0, // 图例组件离容器上侧的距离
            itemWidth: 20, // 图例标记的图形宽度
            itemHeight: 10, // 图例标记的图形高度
            textStyle: {
              fontSize: 14, // 图例文字大小
            },
            data: ['Student', 'Teacher'],
          },
          series: [
            {
              name: 'Number',
              type: 'pie',
              radius: ['40%', '70%'], // 饼图半径，可以设置成百分比或具体数值
              center: ['50%', '50%'], // 饼图的位置，['50%', '50%'] 表示居中
              avoidLabelOverlap: false, // 是否启用防止标签重叠策略
              label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}: {d}%',
                    fontSize: 13,
                    fontWeight: 'bold',
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
              data: [
                {
                    name: 'Student',
                    value: studentNum,
                    itemStyle: {
                        color: '#FF9F7F'
                    }
                },
                {
                    name: 'Teacher',
                    value: teacherNum,
                    itemStyle: {
                        color: '#6CB2EB'
                    }
                },
              ],
            },
          ],
    };

    // 要实现的效果:每隔三位数字加一个逗号
    const changeNumStyle = (num: number) => {
        // 将数字转换为字符串
        const strNum = num.toString();
        // 使用正则表达式在逗号前插入每隔三位数字
        return strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // 生成模拟的系统操作记录数据
    const generateLogs = () => {
        const actions = ['订单修改', '用户修改', '用户认证', '登录信息修改'];
        const users = ['LiuSG', '管理员B', '管理员C', '管理员D'];
        const descriptions = [
        '修改了订单的price',
        '通过了用户的教师认证请求',
        '修改了用户的登录密码',
        '修改了用户的电话号码',
        ];

        const generatedLogs = [];
        for (let i = 1; i <= 30; i++) {
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        const log = {
            id: i,
            action: randomAction,
            time: new Date().toLocaleString(),
            user: randomUser,
            description: randomDescription,
        };
        generatedLogs.push(log);
        }
        return generatedLogs;
    };
    const [logs, setLogs] = useState(generateLogs());
    const [currentPage, setCurrentPage] = useState(0);
    
    // 计算总页数
    const totalPages = Math.ceil(logs.length / 3);
    // 当前页的数据
    const currentLogs = logs.slice(currentPage * 3, currentPage * 3 + 3);

    return (
        <div className="flex flex-col w-full h-full p-4 ">  
            {/* 上层 */}
            <div className='flex flex-row justify-center gap-5 py-3 bg-white rounded shadow mb-4'>
                {/* 问候欢迎语 导航栏*/}
                <div className="flex flex-row items-center justify-around border rounded-xl px-4">
                    {/* 文字部分 */}
                    <div className="basis-auto">
                        <h1 className='font-sans font-extrabold text-2xl'>Hello, LiuSG!</h1>  
                        <p className='font-sans text-xl'>Welcome to Melo-Tutor Backstage Manage System.</p>
                    </div>

                    <div className="flex flex-row">
                        {/* 消息按钮 */}
                        <div className="navbar-end">
                            <button className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    <span className="badge badge-xs badge-primary indicator-item"></span>
                                </div>
                            </button>
                        </div>
                        <div className="dropdown dropdown-end">
                            {/* 用户头像*/}
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            {/* 用户选项卡 */}
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 系统卡片信息 */} 
                <div className='stats shadow font-mono'>
                    <div className="stat">
                        <div className="stat-title font-bold flex items-center gap-2">
                            Total Page Views
                            <img src={views} className='w-6'/>
                        </div>
                        <div className="stat-value text-violet-600">89,400</div>
                        <div className="stat-desc font-[400]">21% more than last month</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title font-bold flex items-center gap-2">
                            Current Total Users
                            <img src={students} className='w-6'/>
                        </div>
                        <div className="stat-value text-sky-700">{changeNumStyle(teacherNum + studentNum)}</div>
                        <div className="stat-desc font-[400]">21% more than last month</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title font-bold flex items-center gap-2">
                            Teachers Numbers
                            <img src={teachers} className='w-6'/>
                        </div>
                        <div className="stat-value text-amber-700">{changeNumStyle(teacherNum)}</div>
                        <div className="stat-desc font-[400]">21% more than last month</div>
                    </div>
                </div>
            </div>

            {/* 中层 */}
            <div className='flex flex-row h-[320px] gap-4 bg-white rounded shadow p-4 mb-4'>
                {/* 五星教师 轮播图*/}
                <div className="carousel w-1/3">
                    <div id="slide1" className="carousel-item relative w-full">
                        <TeacherCard teacherAvatar={avatar} teacherName={"Lily"} teacherRank={5} teacherEducation={"Master's degree"}/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                            <a href="#slide5" className="btn btn-circle">❮</a> 
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide2" className="carousel-item relative w-full">
                        <TeacherCard teacherAvatar={avatar} teacherName={"John"} teacherRank={5} teacherEducation={"Master's degree"}/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                            <a href="#slide1" className="btn btn-circle">❮</a> 
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide3" className="carousel-item relative w-full">
                        <TeacherCard teacherAvatar={avatar} teacherName={"Mike"} teacherRank={5} teacherEducation={"Master's degree"}/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                            <a href="#slide2" className="btn btn-circle">❮</a> 
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide4" className="carousel-item relative w-full">
                        <TeacherCard teacherAvatar={avatar} teacherName={"WangMing"} teacherRank={5} teacherEducation={"Master's degree"}/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                            <a href="#slide3" className="btn btn-circle">❮</a> 
                            <a href="#slide5" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide5" className="carousel-item relative w-full">
                        <TeacherCard teacherAvatar={avatar} teacherName={"Rose"} teacherRank={5} teacherEducation={"Master's degree"}/>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                            <a href="#slide4" className="btn btn-circle">❮</a> 
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>

                {/* 当前平台教师，学生的数量 饼状图*/}
                <div className='flex flex-col w-1/3 bg-white rounded shadow'> 
                    <h2 className="text-xl font-bold text-center">Student & Teacher</h2>
                    <ReactEcharts option={satOption} style={{width:'100%', height:'75%'}}/>
                </div>
                
                {/* 日历显示 */}
                <div className='w-1/3 overflow-auto bg-white rounded shadow'>
                    <Calendar />
                </div>
            </div>
            
            {/* 底层 */}
            <div>
                {/* 系统操作记录 */}
                <div className="rounded-lg bg-white shadow-md p-4">
                    <h2 className="text-xl font-bold mb-4">系统操作记录</h2>
                    <SystemLogTable logs={currentLogs} />
                    <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        前一页
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`mx-1 px-3 py-2 rounded ${
                            currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                        >
                        {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        下一页
                    </button>
                    </div>
                </div>
            </div>
            
            {/* 每周教师与学生订单与每周的成交数量 折线图与柱状图 */}
            {/* <div className=''>
                <ReactEcharts option={orderOption} />
            </div> */}
        </div>
    )
}

export default Dashboard;