import { useState, useEffect } from 'react';
import { signon } from '@/types/signon';
import axios from 'axios';
import axiosInstance from '@/apis/axiosConfig';

const EditForm = (props: any) => {
  const { signon, onChange, onSave, onCancel } = props

  return (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div 
              className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-4">Edit Sign Info</h2>
              <form className="space-y-4">
                  <div className="flex flex-col">
                      <label htmlFor="account" className="font-semibold">Account:</label>
                      <input 
                          type='text' 
                          id='account' 
                          name='account' 
                          value={signon.account}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="password" className="font-semibold">Password:</label>
                      <input 
                          type='text' 
                          id='password' 
                          name='password' 
                          value={signon.password}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="phone" className="font-semibold">Phone:</label>
                      <input 
                          type='text' 
                          id='phone' 
                          name='phone' 
                          value={signon.phone}
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

const SignOnTable = ()=> {
    const iniSignOn: signon = {
        uid: -1,
        account: "",
        password: "",
        phone: "",
    }
  
  const [searchTerm, setSearchTerm] = useState("")
  const [signons, setSignOns] = useState<signon[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [signonsPerPage] = useState(6)
  const [isEditing, setIsEditing] = useState(false)
  const [editingSignOn, setEditingSignOn] = useState<signon>(iniSignOn)
  

  // 获取登录信息,并设置signons数组,以显示在页面上,依赖于currentPage和signonsPerPage
  useEffect(() => {
    const fetchSignOns = async () => {
      const response = await axiosInstance.get('/signon/infos')
      
      console.log(response.data)
      const responseSignOns = response.data.data
      setSignOns(responseSignOns)
    }

    fetchSignOns();
  }, [currentPage, signonsPerPage])

  // 计算总页数
  const totalPages = Math.ceil(signons.length / signonsPerPage)

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

  const handleSearch = (account: string) => {
    const searchedSignOns = signons.filter((item: signon) => item.account === account)
    setSignOns(searchedSignOns)
  }

  const handleEditSignOn = (csignon: signon) => {
    setEditingSignOn(csignon) //设置正在编辑的登录信息
    setIsEditing(true) // 显示编辑框
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingSignOn({...editingSignOn, [event.target.name]: event.target.value})
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  // 保存编辑
  const handleSaveSignOn = async () => {
    // 发送Put请求到后端API，以更新登录信息
    const response = await axiosInstance.put(`/signon/info`, editingSignOn)
    // 如果请求成功，则更新currentSignOns数组
    if (response.data.code === 200) {
      setSignOns(signons.map((item: signon) => item.uid === editingSignOn.uid ? editingSignOn : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
            <input
                type="text"
                placeholder="Search Sign On Information"
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
                <th className='border border-gray-400 px-4 py-2 text-lg'>Account</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Password</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Phone</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Process</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的登录信息 */}
              {
                signons
                .slice((currentPage - 1) * signonsPerPage, currentPage * signonsPerPage)
                .map((item: signon) => (
                  <tr key={item.uid} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.account}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.password}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.phone}</td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditSignOn(item)}
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
                <td colSpan={4} className='p-2'>
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
            isEditing && <EditForm signon={editingSignOn} onChange={handleInputChange} onSave={handleSaveSignOn} onCancel={handleCancelEdit}/>         
          }
    </div>
  )
}

export default SignOnTable;