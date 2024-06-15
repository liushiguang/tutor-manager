import { useState, useEffect } from 'react';
import axios from 'axios';
import { teacher } from '@/types/teacher';
import axiosInstance from '@/apis/axiosConfig';

const EditForm = (props: any) => {
  const { teacher, onChange, onSave, onCancel } = props

  return (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div 
              className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-4">Edit Teacher Info</h2>
              <form className="space-y-4">
                  <div className="flex flex-col">
                      <label htmlFor="username" className="font-semibold">Teacher Name:</label>
                      <input 
                          type='text' 
                          id='username' 
                          name='username' 
                          value={teacher.username}
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
                          value={teacher.content}
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
                          value={teacher.location}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="education" className="font-semibold">Education:</label>
                      <input 
                          type='text' 
                          id='education' 
                          name='education' 
                          value={teacher.education}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="salary" className="font-semibold">Salary:</label>
                      <input 
                          type='text' 
                          id='salary' 
                          name='salary' 
                          value={teacher.salary}
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

const TeacherInfoTable = (props : any)=> {
    
  const { perPage } = props
  const iniTeacher: teacher = {
      uid: -1,
      content: "",
      username: "",
      location: "",
      education: "",
      salary: 0,
    }
  
  const [searchTerm, setSearchTerm] = useState("")
  const [teachers, setTeachers] = useState<teacher[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [teachersPerPage] = useState(perPage)
  const [isEditing, setIsEditing] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<teacher>(iniTeacher)
  

  // 获取教师信息,并设置teachers数组,以显示在页面上,依赖于currentPage和teachersPerPage
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await axiosInstance.get('/teacher/infos')
      
      const responseTeachers = response.data.data
      setTeachers(responseTeachers)
    }

    fetchTeachers();
  }, [currentPage, teachersPerPage])

  // 计算总页数
  const totalPages = Math.ceil(teachers.length / teachersPerPage)

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

  const handleSearch = (teacherName: string) => {
    const searchedTeachers = teachers.filter((item: teacher) => item.username === teacherName)
    setTeachers(searchedTeachers)
  }

  const handleEditTeacher = (cteacher: teacher) => {
    setEditingTeacher(cteacher) //设置正在编辑的教师信息
    setIsEditing(true) // 显示编辑框
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTeacher({...editingTeacher, [event.target.name]: event.target.value})
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  // 保存编辑
  const handleSaveTeacher = async () => {
    // 发送Put请求到后端API，以更新教师的信息
    const response = await axiosInstance.put(`/teacher/info`, editingTeacher)
    // 如果请求成功，则更新currentTeachers数组
    if (response.data.code === 200) {
      setTeachers(teachers.map((item: teacher) => item.uid === editingTeacher.uid ? editingTeacher : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
            <input
                type="text"
                placeholder="Search Teachers"
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
                <th className='border border-gray-400 px-4 py-2 text-lg'>Teacher Name</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Content</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Location</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Education</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Salary</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Process</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的教师信息 */}
              {
                teachers
                .slice((currentPage - 1) * teachersPerPage, currentPage * teachersPerPage)
                .map((item: teacher) => (
                  <tr key={item.uid} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.username}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.content}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.location}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.education}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.salary}</td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditTeacher(item)}
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
                <td colSpan={6} className='p-2'>
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
            isEditing && <EditForm teacher={editingTeacher} onChange={handleInputChange} onSave={handleSaveTeacher} onCancel={handleCancelEdit}/>         
          }
    </div>
  )
}

export default TeacherInfoTable;