import ReactEcharts from 'echarts-for-react';
import avatar from '@/resources/backstage/user.svg'
import views from '@/resources/backstage/views.svg'
import students from '@/resources/backstage/students.svg'
import teachers from '@/resources/backstage/teachers.svg'
import { format, getDay, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import classNames from 'classnames';
import { useState } from 'react';
  
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
        <div className="container mx-auto p-5 bg-white shadow rounded-lg ">
            <div className="flex justify-between items-center mb-4">
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


const TeacherCard = ({teacherName, teacherRank, teacherAvatar, teacherEducation}) => {
    return (
        <div className='flex flex-col text-center border-4 rounded-2xl border-b-indigo-500'>
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
    // TODO 模拟数据
    const [studentNum, teacherNum] = [689, 511]  
    const recruitmentNum = [150, 232, 201, 154, 190, 330, 410]
    const applicationNum = [220, 182, 191, 234, 290, 330, 310]
    const dealNum = [30, 45, 53, 54, 65, 78, 82]

    const orderOption = {
        title: {
            text: 'Order & Deal',
            left: 'center',
            top: '10%',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 24
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: ['Recruitment', 'Application', 'Deal'],
            top: '85%',
            textStyle: {
                fontSize: 14
            }
        },
        xAxis: [{
            type: 'category',
            data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                fontSize: 14
            }
        }],
        yAxis: [{
                type: 'value',
                name: 'Numbers',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value}',
                    fontSize: 14
                }
            },
            {
                type: 'value',
                name: 'Deal',
                min: 0,
                max: 150,
                interval: 30,
                axisLabel: {
                    formatter: '{value}',
                    fontSize: 14
                }
            }
        ],
        series: [{
                name: 'Recruitment',
                type: 'bar',
                data: recruitmentNum,
                itemStyle: {
                    color: '#6CB2EB' // 自定义柱状图颜色
                }
            },
            {
                name: 'Application',
                type: 'bar',
                data: applicationNum,
                itemStyle: {
                    color: '#FF9F7F' // 自定义柱状图颜色
                }
            },
            {
                name: 'Deal',
                type: 'line',
                yAxisIndex: 1,
                data: dealNum,
                itemStyle: {
                    color: '#66CC99' // 自定义线条颜色
                },
                lineStyle: {
                    width: 2 // 自定义线条粗细
                },
                symbol: 'circle', // 自定义数据点形状
                symbolSize: 8 // 自定义数据点大小
            }
        ]
    };

    const satOption = {
        title: {
            text: 'Student & Teacher',
            left: 'center',
            top: '10%',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 24
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            top: '80%',
        },
        series: [{
            name: 'numbers',
            type: 'pie',
            radius: '50%', // 设置为单个值，表示不使用圆环
            center: ['50%', '50%'],
            data: [{
                    value: studentNum,
                    name: 'Student'
                },
                {
                    value: teacherNum,
                    name: 'Teacher'
                }
            ],
            label: {
                show: true,
                formatter: '{b}: {d}%', // 显示名称和百分比
                fontSize: 16
            },
            labelLine: {
                show: true
            },
            itemStyle: {
                borderRadius: 10, // 圆角
                borderColor: '#fff',
                borderWidth: 2
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10, // 阴影模糊度
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
                }
            },
            color: ['#6CB2EB', '#FF9F7F'] // 自定义颜色
        }]
    };
    // 要实现的效果:每隔三位数字加一个逗号
    const changeNumStyle = (num: number) => {
        // 将数字转换为字符串
        const strNum = num.toString();
        // 使用正则表达式在逗号前插入每隔三位数字
        return strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div className="w-full h-full p-4 grid gap-4 grid-rows-6 grid-cols-6 items-center">  
            {/* 问候欢迎语 导航栏*/}
            <div className="flex flex-row items-center justify-around w-full h-full border rounded-xl row-span-1 col-span-3 row-start-1 col-start-1">
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
            <div className='stats shadow row-span-1 col-span-3 row-start-1 font-sans'>
                <div className="stat ">
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

            {/* 五星教师 轮播图*/}
            <div className="carousel row-span-3 col-span-2 row-start-2 col-start-1">
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
            <div className='col-span-1 row-span-2 row-start-5 col-start-1'> 
                <ReactEcharts option={satOption} />
             </div>
            {/* 日历显示 */}
            <div className='row-span-3 col-span-2 row-start-2 col-start-3'>
                <Calendar />
            </div>
            {/* 每周教师与学生订单与每周的成交数量 折线图与柱状图*/}
            <div className='row-span-2 col-span-5 row-start-5 col-start-2'>
                <ReactEcharts option={orderOption} />
            </div>
        
            {/* 教师学生男女的比例的雷达图 */}

        </div>
    )
}

export default Dashboard;