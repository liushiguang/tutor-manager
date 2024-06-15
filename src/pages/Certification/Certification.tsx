import { useState, useEffect } from 'react';
import axiosInstance from '@/apis/axiosConfig';
import { certification } from '@/types/certification';
import CustomAlert,{INFO_LEVEL, SUCCESS_LEVEL, ERROR_LEVEL, WARNING_LEVEL} from '@/components/CustomAlert/CustomAlert';

const EditForm = (props: any) => {
    const { certification, onChange, onApprove, onDisapprove } = props
  
    return (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
              <div 
                className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
                <h2 className="text-center text-2xl font-semibold mb-4">Review The Application</h2>
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="font-semibold">User Name:</label>
                        <input 
                            type='text' 
                            id='username' 
                            name='username' 
                            value={certification.uid}
                            onChange={onChange}
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="institution" className="font-semibold">Institution:</label>
                        <input
                            id='institution' 
                            name='institution' 
                            value={certification.institution}
                            onChange={onChange}
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="institution" className="font-semibold">Image:</label>
                        <img
                            id='image'
                            src={`data:Image/png;base64,${certification.file}`}
                            alt='Certification Image'
                            className='mx-auto'
                         />
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={onDisapprove}
                            className="glass py-2 px-6 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
                            否决
                        </button>
                        <button 
                            onClick={onApprove}
                            className="glass py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                            批准
                        </button>
                    </div>
                </form>
              </div>
            </div>
    )
  }

export const Certification = () => {
    const { perPage } = { perPage: 4 };
    const iniCertification: certification = {
        id: 0,
        uid: 0,
        institution: "",
        file: "",
        code: "",
    };

    const [certifications, setCertifications] = useState<certification[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [certificationsPerPage] = useState(perPage);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCertification, setEditingCertification] = useState<certification>(iniCertification);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertLevel, setAlertLevel] = useState(INFO_LEVEL);

    // 获取认证信息,并设置certifications数组,以显示在页面上,依赖于currentPage
    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await axiosInstance.get('/certification/infos');
                const responseCertifications = response.data.data;

                setCertifications(responseCertifications);                
            } catch (error) {
                console.error('Error fetching certifications:', error);
            }
        };

        fetchCertifications();
    }, [currentPage]);

    // useEffect(() => {
    //     // setCertifications(certifications);
    //     console.log(certifications);
    // }, [certifications])

    // 计算总页数
    const totalPages = Math.ceil(certifications.length / certificationsPerPage);

    // 分页逻辑: 点击页码按钮,则设置currentPage为该页码
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // 生成页码按钮
    const renderPageButtons = () => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
                <button key={i} onClick={() => handlePageChange(i)} disabled={currentPage === i}
                    className='btn btn-circle glass'>
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

    const handleEditCertification = (ccertification: certification) => {
        setEditingCertification(ccertification); //设置正在编辑的认证信息
        setIsEditing(true); // 显示编辑框
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingCertification({ ...editingCertification, [event.target.name]: event.target.value });
    };

    const handleApproveCertification = async () => {
        setEditingCertification({ ...editingCertification, code: '200' });
        // 发送Put请求到后端API，以更新认证的信息(改变code)
        const response = await axiosInstance.put(`/certification/info`, editingCertification);
        // 如果请求成功，则进行数据库操作(改变type)
        if (response.status === 200) {
            // 发送Put请求到后端API，以更新教师的信息(type)
            const response = await axiosInstance.put(`/user/type/${editingCertification.uid}`)
            
            if (response.status === 200) {
                setShowAlert(true);
                setAlertMsg('Approved successfully');
                setAlertLevel(SUCCESS_LEVEL);
                setInterval(() => {
                    setShowAlert(false);
                }, 3000);

                // 更新certifications数组
                setCertifications(certifications.map((item) => {
                    if (item.id === editingCertification.id) {
                        return { ...item, code: '200' };
                    }
                    return item;
                }));
                setIsEditing(false); // 隐藏编辑框
            } else {
                setShowAlert(true);
                setAlertMsg('Approve failed');
                setAlertLevel(ERROR_LEVEL);
                setInterval(() => {
                    setShowAlert(false);
                }, 3000);
            }
        } else {
            setShowAlert(true);
            setAlertMsg('Approve failed');
            setAlertLevel(ERROR_LEVEL);
            setInterval(() => {
                setShowAlert(false);
            }, 3000);
        }

    };

    const handleDisapproveCertification = async () => {
        setEditingCertification({ ...editingCertification, code: '400' });
        // 发送Put请求到后端API，以更新认证的信息(code)
        const response = await axiosInstance.put(`/certification/info`, editingCertification);
        if (response.status === 200) {
            setShowAlert(true);
            setAlertMsg('Disapproved successfully');
            setAlertLevel(SUCCESS_LEVEL);
            setInterval(() => {
                setShowAlert(false);
            }, 3000);

            // 更新certifications数组
            setCertifications(certifications.map((item) => {
                if (item.id === editingCertification.id) {
                    return { ...item, code: '400' };
                }
                return item;
            }));
            setIsEditing(false); // 隐藏编辑框
        } else {
            setShowAlert(true);
            setAlertMsg('Disapprove failed');
            setAlertLevel(ERROR_LEVEL);
            setInterval(() => {
                setShowAlert(false);
            }, 3000);
        }
    };


    return (
        <div className="container mx-auto mt-[10%] w-2/3">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden font-sans">
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='border border-gray-400 px-4 py-2 text-lg'>User</th>
                        <th className='border border-gray-400 px-4 py-2 text-lg'>Institution</th>
                        <th className='border border-gray-400 px-4 py-2 text-lg'>Image</th>
                        <th className='border border-gray-400 px-4 py-2 text-lg'>Status</th>
                        <th className='border border-gray-400 px-4 py-2 text-lg'>Process</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 显示当前页的认证信息 */}
                    {
                        certifications.length === 0 ?
                            <tr>
                                <td colSpan={5} className='text-center p-2'>No pending certification found</td>
                            </tr> 
                        :
                        certifications
                            .slice((currentPage - 1) * certificationsPerPage, currentPage * certificationsPerPage)
                            .map((item: certification) => (
                                <tr key={item.id} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.uid}</td>
                                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.institution}</td>
                                    <td className='border border-gray-400 px-4 py-2 text-center'>
                                        <img src={`data:Image/png;base64,${item.file}`}
                                            alt='Certification Image'
                                            className='w-[100px] h-[60px] mx-auto' />
                                    </td>
                                    <td className='border border-gray-400 px-4 py-2 text-center'>
                                        {item.code === '200' ? 'Approved' :
                                            item.code === '400' ? 'Disapproved' : 'Pending'}
                                    </td>
                                    <td className='border border-gray-400 px-4 py-2'>
                                        <div className='flex flex-row justify-evenly space-x-2'>
                                            <button
                                                onClick={() => handleEditCertification(item)}
                                                disabled={item.code === '200' || item.code === '400'}
                                                className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none">
                                                处理
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
                <tfoot>
                    {/* 分页按钮 */}
                    <tr>
                        <td colSpan={5} className='p-2'>
                            <div className='w-full flex flex-row justify-center space-x-4'>
                                <button
                                    className='py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
                                    onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    上一页
                                </button>
                                {renderPageButtons()}
                                <button
                                    className='py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
                                    onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    下一页
                                </button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            { 
                isEditing && <EditForm certification={editingCertification} onChange={handleInputChange} onApprove={handleApproveCertification} onDisapprove={handleDisapproveCertification} />
            }
            {
                showAlert && 
                <div className='absolute top-3'>
                    <CustomAlert msg={alertMsg} level={alertLevel} />
                </div>
            }
        </div>
        
    );
};

export default Certification;