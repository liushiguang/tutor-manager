import { useState, useEffect } from 'react';
import axiosInstance from '@/apis/axiosConfig';
import classNames from 'classnames';
import { order } from '@/types/order';
import CustomAlert,{INFO_LEVEL, SUCCESS_LEVEL, ERROR_LEVEL, WARNING_LEVEL} from '@/components/CustomAlert/CustomAlert';

const EditForm = (props: any) => {
  const { order, onChange, onSave, onCancel } = props

  return (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div 
              className="w-[22%] border border-gray-300 rounded-2xl p-6 bg-white shadow-md">
              <h2 className="text-center text-2xl font-semibold mb-4">Edit Order Info</h2>
              <form className="space-y-4">
                  <div className="flex flex-col">
                      <label htmlFor="price" className="font-semibold">Price:</label>
                      <input 
                          type='text' 
                          id='price' 
                          name='price' 
                          value={order.price}
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
                          value={order.address}
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
                          value={order.lessons}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                      </input>
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="Schedule" className="font-semibold">Schedule:</label>
                      <input
                          type='text'
                          id='Schedule' 
                          name='Schedule' 
                          value={order.process}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                      </input>
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="status" className="font-semibold">Status:</label>
                      <select
                          id='status' 
                          name='status' 
                          value={order.status}
                          onChange={onChange}
                          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                          <option value={0}>Doing</option>
                          <option value={1}>Done</option>
                          <option value={-1}>Canceled</option>
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

const OrderTable = (props : any)=> {
  const { perPage } = props
  const iniOrder: order = {
      id: -1,
      orderId: -1,
      studentId: 1,
      teacherId: 1,
      price: 0,
      address: "",
      lessons: 0,
      process: 0,
      status: 0,
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState<order[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(perPage)
  const [isEditing, setIsEditing] = useState(false)
  const [editingOrder, setEditingOrder] = useState<order>(iniOrder)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [alertLevel, setAlertLevel] = useState(0)

  // 获取订单信息,并设置orders数组,以显示在页面上,依赖于currentPage和ordersPerPage
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axiosInstance.get('/order/infos')
      
      const responseOrders = response.data.data
      setOrders(responseOrders)
    }

    fetchOrders();
  }, [currentPage, ordersPerPage])

  // 计算总页数
  const totalPages = Math.ceil(orders.length / ordersPerPage)

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

  const handleSearch = (address: string) => {
    const searchedOrders = orders.filter((item: order) => item.address === address)

    if (searchedOrders.length === 0) {
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
    
    setOrders(searchedOrders)
  }

  const handleEditOrder = (corder: order) => {
    setEditingOrder(corder) //设置正在编辑的订单信息
    setIsEditing(true) // 显示编辑框
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingOrder({...editingOrder, [event.target.name]: event.target.value})
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  // 保存编辑
  const handleSaveOrder = async () => {
    // 发送Put请求到后端API，以更新订单的信息
    const response = await axiosInstance.put(`/order/info`, editingOrder)
    // 如果请求成功，则更新currentOrders数组
    if (response.data.code === 200) {
      setOrders(orders.map((item: order) => item.orderId === editingOrder.orderId ? editingOrder : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
            <input
                type="text"
                placeholder="Search Orders"
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
                <th className='border border-gray-400 px-4 py-2 text-lg'>Student</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Teacher</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Price</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Address</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Lessons</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Schedule</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Status</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>Process</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的订单信息 */}
              {
                orders
                .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
                .map((item: order) => (
                  <tr key={item.orderId} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.studentId}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.teacherId}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.price}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.address}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.lessons}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>
                        { item.process / 8 * 100 }%
                    </td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>
                        {item.status}
                    </td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditOrder(item)}
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
                <td colSpan={8} className='p-2'>
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
            isEditing && <EditForm order={editingOrder} onChange={handleInputChange} onSave={handleSaveOrder} onCancel={handleCancelEdit}/>         
          }
          {
            showAlert && <CustomAlert msg={alertMsg} level={alertLevel} />
          }
    </div>
  )
}

export default OrderTable;