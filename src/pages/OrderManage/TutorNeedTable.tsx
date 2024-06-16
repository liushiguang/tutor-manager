import { useState, useEffect } from 'react';
import axiosInstance from '@/apis/axiosConfig';
import { tutor } from '@/types/tutor';
import CustomAlert,{INFO_LEVEL, ERROR_LEVEL, SUCCESS_LEVEL, WARNING_LEVEL} from '@/components/CustomAlert/CustomAlert';

const EditForm = (props: any) => {
  const { tutor, onChange, onSave, onCancel } = props

  return (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div 
              className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-4">Edit Tutor Info</h2>
              <form className="space-y-4">
                  <div className="flex flex-col">
                      <label htmlFor="title" className="font-semibold">Title:</label>
                      <input 
                          type='text' 
                          id='title' 
                          name='title' 
                          value={tutor.title}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="content" className="font-semibold">Content:</label>
                      <input 
                          type='text' 
                          id='content' 
                          name='content' 
                          value={tutor.content}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="address" className="font-semibold">Address:</label>
                      <input 
                          type='text' 
                          id='address' 
                          name='address' 
                          value={tutor.address}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="subject" className="font-semibold">Subject:</label>
                      <input 
                          type='text' 
                          id='subject' 
                          name='subject' 
                          value={tutor.subject}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="level" className="font-semibold">Level:</label>
                      <input 
                          type='text' 
                          id='level' 
                          name='level' 
                          value={tutor.level}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="duration" className="font-semibold">Duration:</label>
                      <input 
                          type='text' 
                          id='duration' 
                          name='duration' 
                          value={tutor.duration}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="lessons" className="font-semibold">Lessons:</label>
                      <input
                          type='text'
                          id='lessons' 
                          name='lessons' 
                          value={tutor.lessons}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                      </input>
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="price" className="font-semibold">Price:</label>
                      <input
                          type='text'
                          id='price' 
                          name='price' 
                          value={tutor.price}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                      </input>
                  </div>
                  <div className="flex justify-center space-x-4">
                      <button 
                          onClick={onCancel}
                          className="glass py-2 px-6 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
                          取消
                      </button>
                      <button 
                          onClick={onSave}
                          className="glass py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                          保存
                      </button>
                  </div>
              </form>
            </div>
          </div>
  )
}

const TutorNeedTable = (props : any)=> {
  const { perPage } = props
  const iniTutor: tutor = {
    id: 0,
    uid: 0,
    username: "",
    title: "",
    content: "",
    address: "",
    subject: "",
    level: 0,
    date: "",
    duration: "",
    lessons: 0,
    price: 0,
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [tutors, setTutors] = useState<tutor[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [tutorsPerPage] = useState(perPage)
  const [isEditing, setIsEditing] = useState(false)
  const [editingTutor, setEditingTutor] = useState<tutor>(iniTutor)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [alertLevel, setAlertLevel] = useState(0)

  // 获取家教需求信息,并设置tutors数组,以显示在页面上,依赖于currentPage和tutorsPerPage
  useEffect(() => {
    const fetchTutors = async () => {
      const response = await axiosInstance.get('/tutor/infos')
      
      const responseTutors = response.data.data
      setTutors(responseTutors)
    }

    fetchTutors();
  }, [currentPage, tutorsPerPage])

  // 计算总页数
  const totalPages = Math.ceil(tutors.length / tutorsPerPage)

  // 分页逻辑: 点击页码按钮,则设置currentPage为该页码
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

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

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  const handleSearch = (username: string) => {
    const searchedTutors = tutors.filter((item: tutor) => item.username === username)

    if (searchedTutors.length === 0) {
      setShowAlert(true)
      setAlertMsg("未找到匹配的登录信息")
      setAlertLevel(ERROR_LEVEL)
      setInterval(() => {
        setShowAlert(false)
      }, 3000)
    } else {
      setShowAlert(true)
      setAlertMsg("查询成功")
      setAlertLevel(SUCCESS_LEVEL)
      setInterval(() => {
        setShowAlert(false)
      }, 3000) 
    }

    setTutors(searchedTutors)
  }

  const handleEditTutor = (ctutor: tutor) => {
    setEditingTutor(ctutor) //设置正在编辑的家教需求信息
    setIsEditing(true) // 显示编辑框
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTutor({...editingTutor, [event.target.name]: event.target.value})
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  // 保存编辑
  const handleSaveTutor = async () => {
    // 发送Put请求到后端API，以更新家教需求的信息
    const response = await axiosInstance.put(`/tutor/info`, editingTutor)
    // 如果请求成功，则更新currentTutors数组
    if (response.data.code === 200) {
      setTutors(tutors.map((item: tutor) => item.id === editingTutor.id ? editingTutor : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
            <input
                type="text"
                placeholder="Search Tutors"
                value={searchTerm}
                onChange={(event)=>handleSearchTerm(event.target.value)}
                className="basis-[85%] px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none hover:border-blue-500"
            />
            <button 
                onClick={()=>handleSearch(searchTerm)}
                className="basis-[15%] bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600 transition duration-200">
                Search
            </button>
          </div>
          
          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden font-sans">
            <thead className='bg-gray-200'>
              <tr>
              <th className='border border-gray-400 px-4 py-2 text-lg'>User Name</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Title</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Content</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Address</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Subject</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Level</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Duration</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Lessons</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Price</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Process</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的家教需求信息 */}
              {
                tutors
                .slice((currentPage - 1) * tutorsPerPage, currentPage * tutorsPerPage)
                .map((item: tutor) => (
                  <tr key={item.id} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.username}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.title}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.content}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.address}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.subject}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.level}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.duration}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.lessons}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.price}</td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditTutor(item)}
                              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none">
                              编辑
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
                <td colSpan={10} className='p-2'>
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
            isEditing && <EditForm tutor={editingTutor} onChange={handleInputChange} onSave={handleSaveTutor} onCancel={handleCancelEdit}/>         
          }
          {
            showAlert && <CustomAlert msg={alertMsg} level={alertLevel} />
          }
    </div>
  )
}

export default TutorNeedTable;