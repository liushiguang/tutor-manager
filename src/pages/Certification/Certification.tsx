import { useState, useEffect } from 'react';
import axiosInstance from '@/apis/axiosConfig';
import { certification } from '@/types/certification';
import CustomAlert,{INFO_LEVEL, SUCCESS_LEVEL, ERROR_LEVEL} from '@/components/CustomAlert/CustomAlert';

const EditForm = (props: any) => {
    const { certification, onChange, onApprove, onDisapprove } = props
  
    return (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
              <div 
                className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-lg">
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
                            className='mx-auto rounded-md shadow-md'
                         />
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={onDisapprove}
                            className="glass py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                            否决
                        </button>
                        <button 
                            onClick={onApprove}
                            className="glass py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
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

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCertifications, setFilteredCertifications] = useState<certification[]>([]);

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

    useEffect(() => {
        setFilteredCertifications(
            certifications.filter(certification =>
                certification.uid.toString().includes(searchTerm) ||
                certification.institution.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, certifications]);

    const totalPages = Math.ceil(filteredCertifications.length / certificationsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
                <button key={i} onClick={() => handlePageChange(i)} disabled={currentPage === i}
                    className='btn btn-circle bg-blue-200 hover:bg-blue-300'>
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

    const handleEditCertification = (certification: certification) => {
        setEditingCertification(certification); //设置正在编辑的认证信息
        setIsEditing(true); // 显示编辑框
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingCertification({ ...editingCertification, [event.target.name]: event.target.value });
    };

    const handleApproveCertification = async () => {
        const response = await axiosInstance.put(`/certification/app`, editingCertification);
        if (response.data.code === 200) {
            setShowAlert(true);
            setAlertMsg('Approved successfully');
            setAlertLevel(SUCCESS_LEVEL);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

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
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }

    };

    const handleDisapproveCertification = async () => {
        setEditingCertification({ ...editingCertification, code: '400' });
            
        const response = await axiosInstance.put(`/certification/dis`, editingCertification);
        if (response.data.code === 200) {
            setShowAlert(true);
            setAlertMsg('Disapproved successfully');
            setAlertLevel(SUCCESS_LEVEL);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

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
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    return (
        <div className="container mx-auto mt-[10%] w-2/3">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-2">Certification Review</h1>
                <p className="text-gray-600">Review and manage user certification applications.</p>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Search by User or Institution"
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="space-x-4">
                    <button 
                        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                        onClick={() => setFilteredCertifications(certifications.filter(certification =>
                            certification.uid.toString().includes(searchTerm) ||
                            certification.institution.toLowerCase().includes(searchTerm.toLowerCase())
                        ))}
                    >
                        筛选
                    </button>
                    <button 
                        className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
                        onClick={() => {
                            setSearchTerm('');
                            setFilteredCertifications(certifications);
                        }}
                    >
                        重置
                    </button>
                </div>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className='bg-blue-100'>
                    <tr>
                        <th className='border border-gray-300 px-4 py-2 text-lg'>User</th>
                        <th className='border border-gray-300 px-4 py-2 text-lg'>Institution</th>
                        <th className='border border-gray-300 px-4 py-2 text-lg'>Image</th>
                        <th className='border border-gray-300 px-4 py-2 text-lg'>Status</th>
                        <th className='border border-gray-300 px-4 py-2 text-lg'>Process</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredCertifications.length === 0 ?
                            <tr>
                                <td colSpan={5} className='text-center p-4 text-gray-500'>No pending certification found</td>
                            </tr> 
                        :
                        filteredCertifications
                            .slice((currentPage - 1) * certificationsPerPage, currentPage * certificationsPerPage)
                            .map((item: certification) => (
                                <tr key={item.id} className='text-lg hover:bg-blue-50 transition duration-200'>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{item.uid}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{item.institution}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>
                                        <img src={`data:Image/png;base64,${item.file}`}
                                            alt='Certification Image'
                                            className='w-[100px] h-[60px] mx-auto rounded shadow-md' />
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>
                                        {item.code === '200' ? <span className="text-green-600 font-bold">Approved</span> :
                                            item.code === '400' ? <span className="text-red-600 font-bold">Disapproved</span> : 'Pending'}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        <div className='flex justify-center space-x-2'>
                                            <button
                                                onClick={() => handleEditCertification(item)}
                                                disabled={item.code === '200' || item.code === '400'}
                                                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none">
                                                处理
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5} className='p-4'>
                            <div className='flex justify-center space-x-4'>
                                <button
                                    className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
                                    onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    上一页
                                </button>
                                {renderPageButtons()}
                                <button
                                    className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
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
                <CustomAlert msg={alertMsg} level={alertLevel} />
            }
            <div className="fixed bottom-0 right-0 p-4 text-xs text-gray-400">
                <p>&copy; 2024 Certification Review. All rights reserved.</p>
            </div>
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <img src="decorative-element.svg" className="absolute top-0 left-0 w-16 h-16 opacity-25" alt="decorative element"/>
                <img src="decorative-element.svg" className="absolute bottom-0 right-0 w-16 h-16 opacity-25 transform rotate-180" alt="decorative element"/>
            </div>
        </div>
    );
};

export default Certification;