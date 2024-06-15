import LessonTable from "./LessonTable"
import OrderTable from "./OrderTable"
import TutorNeedTable from "./TutorNeedTable"

const OrderManage = () => {
    
    const perPage = 3;
    return (
        <div className="flex flex-col p-4 space-y-4">
            <div className="flex flex-row">
                Info Graph
            </div>

            {/* 包含用户数据的表格 */}
            {/* - 根据用户的用户名进行查找 */}
            {/* + 根据教师和学生进行筛选 */}
            {/* - 根据性别进行筛选 */}
            {/* + 根据地区进行筛选*/}
            {/* - 修改用户的所有字段的信息 */}
            <div className="bg-white rounded shadow">
                <div role="tablist" className="tabs tabs-bordered">
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tutor Needs" />
                    <div role="tabpanel" className="tab-content p-10">
                        <TutorNeedTable perPage={perPage}/>
                    </div>

                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Orders" checked />
                    <div role="tabpanel" className="tab-content p-10">
                        <OrderTable perPage={perPage}/>
                    </div>

                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Lessons" />
                    <div role="tabpanel" className="tab-content p-10">
                        {/* <LessonTable perPage={perPage}/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManage