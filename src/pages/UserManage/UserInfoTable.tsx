import { useState, useEffect } from 'react';
import axios from 'axios';
import { user } from '@/types/user';
import axiosInstance from '@/apis/axiosConfig';
import classNames from 'classnames';

const EditForm = (props: any) => {
  const { user, onChange, onSave, onCancel } = props

  return (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div 
              className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-4">Edit User Info</h2>
              <form className="space-y-4">
                  <div className="flex flex-col">
                      <label htmlFor="username" className="font-semibold">User Name:</label>
                      <input 
                          type='text' 
                          id='username' 
                          name='username' 
                          value={user.username}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="author" className="font-semibold">Email:</label>
                      <input 
                          type='text' 
                          id='email' 
                          name='email' 
                          value={user.email}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="type" className="font-semibold">Type:</label>
                      <select
                          id='type' 
                          name='type' 
                          value={user.type}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                          <option value={0}>Teacher</option>
                          <option value={-1}>Normal User</option>
                      </select>
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="address" className="font-semibold">Address:</label>
                      <input 
                          type='text' 
                          id='address' 
                          name='address' 
                          value={user.address}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="profile" className="font-semibold">Profile:</label>
                      <textarea 
                        id='profile'
                        name='profile'
                        value={user.profile}
                        onChange={onChange}
                        className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="gender" className="font-semibold">Gender</label>
                      <select 
                          id='gender' 
                          name='gender' 
                          value={user.gender}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                      </select>
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

const UserInfoTable = (props : any)=> {
  const { perPage } = props
  const iniUser: user = {
      uid: -1,
      username: "",
      email: "",
      type: 0,
      address: "",
      gender: 0,
      profile: "",
  }
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<user[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(perPage)
  const [isEditing, setIsEditing] = useState(false)
  const [editingUser, setEditingUser] = useState<user>(iniUser)
  

  // 获取用户信息,并设置users数组,以显示在页面上,依赖于currentPage和usersPerPage
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosInstance.get('/user/infos')
      
      const responseUsers = response.data.data
      setUsers(responseUsers)
    }

    fetchUsers();
  }, [currentPage, usersPerPage])

  // 计算总页数
  const totalPages = Math.ceil(users.length / usersPerPage)

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

  const handleSearch = (userName: string) => {
    const searchedUsers = users.filter((item: user) => item.username === userName)
    setUsers(searchedUsers)
  }

  const handleEditUser = (cuser: user) => {
    setEditingUser(cuser) //设置正在编辑的用户信息
    setIsEditing(true) // 显示编辑框
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser({...editingUser, [event.target.name]: event.target.value})
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  // 保存编辑
  const handleSaveUser = async () => {
    // 发送Put请求到后端API，以更新书籍的信息
    const response = await axiosInstance.put(`/user/info`, editingUser)
    // 如果请求成功，则更新currentUsers数组
    if (response.data.code === 200) {
      setUsers(users.map((item: user) => item.uid === editingUser.uid ? editingUser : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
            <input
                type="text"
                placeholder="Search Users"
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
                <th className='border border-gray-400 px-4 py-2 text-lg'>Email</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Type</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Address</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Gender</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Profile</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Process</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的用户信息 */}
              {
                users
                .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
                .map((item: user) => (
                  <tr key={item.uid} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.username}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.email}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.type === 0 ? 'Teacher' : 'Normal User'}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.address}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.gender === 1 ? 'Female' : 'Male'}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.profile}</td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditUser(item)}
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
                <td colSpan={7} className='p-2'>
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
            isEditing && <EditForm user={editingUser} onChange={handleInputChange} onSave={handleSaveUser} onCancel={handleCancelEdit}/>         
          }
    </div>
  )
}

export default UserInfoTable;