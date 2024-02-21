/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utilities/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { TSidebarItem } from "../../types";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/storeHook";
import { TUser, authGetters } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utilities/verifyToken";
const {  Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    STUDENT: 'student',
    FACULTY: 'faculty',

}
const Sidebar = () => {
  const token = useAppSelector(authGetters.selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  

    let sidebarItems: TSidebarItem[]=[];

    switch (user!.role) {  // stop typescript null check by "!"
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths,userRole.ADMIN)
            break;
        case userRole.FACULTY:
            sidebarItems = sidebarItemsGenerator(facultyPaths,userRole.FACULTY)
            break;
        case userRole.STUDENT:
            sidebarItems = sidebarItemsGenerator(studentPaths,userRole.STUDENT)
            break;
    
        default:
          sidebarItems = []
            break;
    }
    return (
        <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{height:"100vh",position:"static",top:'0',left:'0'}}
      >
        <div
          style={{
            color: "#fff",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>PH Uni</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </Sider>
    );
};

export default Sidebar;