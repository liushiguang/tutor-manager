import SignOnTable from "./SignOnTable"
import TeacherInfoTable from "./TeacherInfoTable"
import UserInfoTable from "./UserInfoTable"

const UserManage = () => {
    return (
        <div className="flex flex-col">
            {/* -----显示大致的统计信息----- */}
            {/* 用户地区分布图
                - 按照不同颜色进行区分 */}
            {/* 家教教师学历雷达图 
                - 高中、专科、本科、硕士、博士 
                - 性别 */}
            <div>
                information table;
            </div>
            {/* -----包含用户数据的表格----- */}
            {/* - 根据用户的用户名进行查找 */}
            {/* + 根据教师和学生进行筛选 */}
            {/* - 根据性别进行筛选 */}
            {/* + 根据地区进行筛选*/}
            {/* - 修改用户的所有字段的信息 */}
            <div>
                <div role="tablist" className="tabs tabs-lifted">
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="SignOn Table" checked />
                    <div role="tabpanel" className="tab-content p-10">
                        <SignOnTable />
                    </div>

                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Teacher Table"/>
                    <div role="tabpanel" className="tab-content p-10">
                        <TeacherInfoTable />
                    </div>
                    
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="User Table" />
                    <div role="tabpanel" className="tab-content p-10">
                        <UserInfoTable />
                    </div>

                </div>
            </div>       
        </div>
    )
}

export default UserManage