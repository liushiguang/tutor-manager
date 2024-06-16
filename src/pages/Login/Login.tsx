import './style.css'
import login_bg from '@/resources/login/login_bg.jpg'
import qq from '@/resources/login/QQ.png'
import wechat from '@/resources/login/WeChat.png'
import { administrator } from '@/types/administrator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/apis/axiosConfig'
import CustomAlert,{INFO_LEVEL, WARNING_LEVEL, ERROR_LEVEL, SUCCESS_LEVEL} from '@/components/CustomAlert/CustomAlert'


const Login = () => {
    const navigate = useNavigate()

    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertLevel, setAlertLevel] = useState(INFO_LEVEL)
    const [showAlert, setShowAlert] = useState(false)

    const handleAccountChange = (value: string) => {
        setAccount(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    }

    // 处理登录逻辑
    const handleLogin = async () => {

        // 封装登录信息
        const administrator: administrator = {
            id: 0,
            account: account,
            password: password,
            email: ''
        }

        // 发送登录请求
        const response = await axiosInstance.post('/administrator/account', administrator)

        const resData = response.data

        console.log(resData)

        if (resData !== "") {
            console.log('登录成功')
            
            // 跳转到主页
            navigate('/')
        }
        else {
            // 封装登录信息
            const administrator: administrator = {
                id: 0,
                email: account,
                password: password,
                account: '',
            }

            const response = await axiosInstance.post('/administrator/email', administrator)
            const resCode = response.data
            if (resCode !== "") {
                console.log('登录成功')
                
                // 跳转到主页
                navigate('/')
            }
            else {
                console.log('登录失败')
                setAlertMsg(response.data.msg)
                setAlertLevel(ERROR_LEVEL)
    
                setShowAlert(true)
                setInterval(() => {
                    setShowAlert(false)
                }, 3000)
            }
        }
    }

    return (
        <div
            className="box">
            <div
                style={{backgroundImage: `url(${login_bg})`}} 
                className="content bg-no-repeat">
                <div className="login-wrapper">
                    <h1>登录</h1>
                    <div className="login-form">
                        <div className="username form-item">
                            <span>使用账号、邮箱</span>
                            <input 
                                type="text"
                                name='account'
                                value={account} 
                                onChange={(e)=>handleAccountChange(e.target.value)}
                                className="input-item focus:ring focus:ring-violet-400" />
                        </div>
                        <div className="password form-item">
                            <span>密码</span>
                            <input 
                                type="password"
                                name='password'
                                value={password}
                                onChange={(e)=>handlePasswordChange(e.target.value)}
                                className="input-item focus:ring focus:ring-violet-400" />
                        </div>
                        <button 
                            onClick={handleLogin}
                            className="login-btn">
                            登 录
                        </button>
                    </div>
                    <div className="divider">
                        <span className="line"></span>
                        <span className="divider-text">其他方式登录</span>
                        <span className="line"></span>
                    </div>
                    <div className="other-login-wrapper">
                        <div className="other-login-item">
                            <img src={qq} alt="" />
                        </div>
                        <div className="other-login-item">
                            <img src={wechat} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {
                showAlert && <CustomAlert msg={alertMsg} level={alertLevel} />
            }
        </div>
    )
}

export default Login;