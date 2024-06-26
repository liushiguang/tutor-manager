import Certification from '@/pages/Certification/Certification';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Login from '@/pages/Login/Login';
import MainPage from '@/pages/MainPage/MainPage';
import NotFound from '@/pages/NotFound/NotFound';
import OrderManage from '@/pages/OrderManage/OrderManage';
import Profile from '@/pages/Profile/Profile';
import Settings from '@/pages/Setting/Setting';
import UserManage from '@/pages/UserManage/UserManage';
import Notification from '@/pages/Notication/Notication';
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <MainPage />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'orderManage',
            element: <OrderManage />
          },
          {
            path: 'userManage',
            element: <UserManage />
          },
          {
            path: 'setting',
            element: <Settings />
          },
          {
            path: 'certification',
            element: <Certification />
          },
          {
            path: 'notification',
            element: <Notification />
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
])

export default router;