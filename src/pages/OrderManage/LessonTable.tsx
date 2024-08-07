import { useState, useEffect } from 'react';
import axiosInstance from '@/apis/axiosConfig';
import { lesson } from '@/types/lesson';
// import { uid2Name } from '@/utils/Utils';
import CustomAlert,{SUCCESS_LEVEL, ERROR_LEVEL} from '@/components/CustomAlert/CustomAlert';

const EditForm = (props: any) => {
  const { lesson, onChange, onSave, onCancel } = props

  return (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div 
              className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-4">Edit Lesson Info</h2>
              <form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="subject" className="font-semibold">Subject:</label>
                        <input 
                            type='text' 
                            id='subject' 
                            name='subject' 
                            value={lesson.subject}
                            onChange={onChange}
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="location" className="font-semibold">Location:</label>
                        <input 
                            type='text' 
                            id='location' 
                            name='location' 
                            value={lesson.location}
                            onChange={onChange}
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
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

const LessonTable = (props : any)=> {
  const { perPage } = props
  const iniLesson: lesson = {
    id: 0,
    subject: "",
    time: "",
    location: "",
    studentName: "",
    studentUid: 0,
    tuid: 0
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [lessons, setLessons] = useState<lesson[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lessonsPerPage] = useState(perPage)
  const [isEditing, setIsEditing] = useState(false)
  const [editingLesson, setEditingLesson] = useState<lesson>(iniLesson)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [alertLevel, setAlertLevel] = useState(0)

  // 获取课程信息,并设置lessons数组,以显示在页面上,依赖于currentPage和lessonsPerPage
  useEffect(() => {
    const fetchLessons = async () => {
      const response = await axiosInstance.get('/lesson/infos')
      
      const responseLessons = response.data.data
      setLessons(responseLessons)
    }

    fetchLessons();
  }, [currentPage, lessonsPerPage])

  // 计算总页数
  const totalPages = Math.ceil(lessons.length / lessonsPerPage)

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

  const handleSearch = (studentName: string) => {
    const searchedLessons = lessons.filter((item: lesson) => item.studentName === studentName)

    if (searchedLessons.length === 0) {
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

    setLessons(searchedLessons)
  }

  const handleEditLesson = (clesson: lesson) => {
    setEditingLesson(clesson) //设置正在编辑的课程信息
    setIsEditing(true) // 显示编辑框
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingLesson({...editingLesson, [event.target.name]: event.target.value})
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  // 保存编辑
  const handleSaveLesson = async () => {
    // 发送Put请求到后端API，以更新课程的信息
    const response = await axiosInstance.put(`/lesson/info`, editingLesson)
    // 如果请求成功，则更新currentLessons数组
    if (response.data.code === 200) {
      setLessons(lessons.map((item: lesson) => item.id === editingLesson.id ? editingLesson : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
            <input
                type="text"
                placeholder="Search Lessons"
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
              <th className='border border-gray-400 px-4 py-2 text-lg'>Subject</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Location</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Student</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Teacher</th>
              <th className='border border-gray-400 px-4 py-2 text-lg'>Process</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的课程信息 */}
              {
                lessons
                .slice((currentPage - 1) * lessonsPerPage, currentPage * lessonsPerPage)
                .map((item: lesson) => (
                  <tr key={item.id} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.subject}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.location}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.studentName}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.tuid}</td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditLesson(item)}
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
            isEditing && <EditForm lesson={editingLesson} onChange={handleInputChange} onSave={handleSaveLesson} onCancel={handleCancelEdit}/>         
          }
          {
            showAlert && <CustomAlert level={alertLevel} message={alertMsg}/>
          }
    </div>
  )
}

export default LessonTable;