import { Outlet,useNavigate } from 'react-router-dom'
import dashicon from '@/resources/backstage/dashboard.svg';
import usericon from '@/resources/backstage/user.svg';
import ordericon from '@/resources/backstage/order.svg';
import certicon from '@/resources/backstage/certification.svg';
import settingicon from '@/resources/backstage/setting.svg';
import profileicon from '@/resources/backstage/profile.svg';
import notificationicon from '@/resources/backstage/notification.svg';
import logo from '@/resources/backstage/Puad.png';

const Sidebar = () => {
    const navigate = useNavigate()
    return (
        // 侧边功能栏的样式
        <div className='basis-auto flex-auto m-3 p-3 border-2 border-black rounded-lg shadow-xl'>
            {/* <ul className='flex flex-col justify-evenly h-full'> */}
            <ul className='flex flex-col justify-start gap-10'>
                <li className='size-fit'>
                    <button className='btn btn-circle border-transparent hover:border-transparent hover:rotate-180'>
                    <img src={logo} className='' alt="logo" />
                    </button>
                </li>
                <li className='text-center'>
                    <button className='w-full btn btn-outline glass btn-xs sm:btn-sm md:btn-md lg:btn-lg text-neutral-500 hover:scale-105' 
                        onClick={() => navigate('/')}>
                        <img src={dashicon} className='w-6'/>
                        Dashboard
                    </button>
                </li>
                <li className='text-center'>
                    <button className='w-full btn btn-outline glass btn-xs sm:btn-sm md:btn-md lg:btn-lg text-neutral-500 hover:scale-105' 
                        onClick={() => navigate('/userManage')}>
                        <img src={usericon} className='w-6'/>
                        User Manage
                    </button>
                </li>
                <li className='text-center'>
                    <button className='w-full btn btn-outline glass btn-xs sm:btn-sm md:btn-md lg:btn-lg text-neutral-500 hover:scale-105' 
                        onClick={() => navigate('/orderManage')}>
                        <img src={ordericon} className='w-6'/>
                        Order Manage
                    </button>
                </li>
                <li className='text-center'>
                    <button className='w-full btn btn-outline glass btn-xs sm:btn-sm md:btn-md lg:btn-lg text-neutral-500 hover:scale-105' 
                        onClick={() => navigate('/certification')}>
                        <img src={certicon} className='w-6'/>
                        Certification
                    </button>
                </li>
                <li className='text-center'>
                    <button className='w-full btn btn-outline glass btn-xs sm:btn-sm md:btn-md lg:btn-lg text-neutral-500 hover:scale-105' 
                        onClick={() => navigate('/notification')}>
                        <img src={notificationicon} className='w-6' />
                        Notification
                    </button>
                </li>
                {/* <li className='text-center'>
                    <button className='w-full btn btn-outline glass btn-xs sm:btn-sm md:btn-md lg:btn-lg text-neutral-500 hover:scale-105' 
                        onClick={() => navigate('/profile')}>
                        <img src={profileicon} className='w-6'></img>
                        Profile
                    </button>
                </li> */}

                {/* <li className='text-center row-start-8  row-end-auto'>
                    <button className='w-full btn btn-outline glass btn-xs sm:btn-sm md:btn-md lg:btn-lg text-neutral-500 hover:scale-105' 
                        onClick={() => navigate('/setting')}>
                        <img src={settingicon} className='w-6'></img>
                        Setting
                    </button>
                </li> */}
            </ul>
        </div>
    )
}

const MainPage = () => {

    return (
        <div className='flex flex-nowrap w-11/12 h-[52rem] mx-auto border-4 border-current rounded-lg bg-slate-50'>
            <Sidebar></Sidebar>
            <div className='flex-auto basis-[83%] m-3 border-3 rounded-lg shadow-2xl'>
                <Outlet />
            </div>
            
        </div>
    )
}

export default MainPage