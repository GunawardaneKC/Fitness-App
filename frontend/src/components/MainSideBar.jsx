import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Layout, Slider, Card } from "antd";
import { UserOutlined, LogoutOutlined, HomeOutlined, FormOutlined, SolutionOutlined, CalendarOutlined, SettingOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const MainSideBar = ({ user }) => {
  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:8080/logout";
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Layout>
      <Sider
        width={298}
        className="bg-black"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <Card
  className="bg-[#3f51b5] text-white"
  bordered={false}
>
          <div className="items-center">
            <img
              className="w-[100px] h-[100px] min-w-[100px] rounded-full border-gray-400 border-2 ml-10"
              src={user?.profileImage}
              alt="profile"
            />
            <div className="">
              <p className="text-base font-bold uppercase">{user?.name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>
        </Card>
        
        <div className="px-4 py-2 justify-center flex">
          <NavLink to="/" className="text-white" activeClassName="text-primary">
            <HomeOutlined /> Home
          </NavLink>
        </div>
        <div className="px-4 py-2 justify-center flex">
          <NavLink to="/post" className="text-white" activeClassName="text-primary">
            <FormOutlined /> Post
          </NavLink>
        </div>
        <div className="px-4 py-2 justify-center flex">
          <NavLink to="/CreateWorkoutStatus" className="text-white" activeClassName="text-primary">
            <SolutionOutlined /> Workout Status
          </NavLink>
        </div>
        <div className="px-4 py-2 justify-center flex">
          <NavLink to="/CreateWorkoutPlan" className="text-white" activeClassName="text-primary">
            <CalendarOutlined /> Workout Plan
          </NavLink>
        </div>
        <div className="px-4 py-2 justify-center flex">
          <NavLink to="/CreateMealPlan" className="text-white" activeClassName="text-primary">
            <CalendarOutlined /> Meal Plan
          </NavLink>
        </div>
      
        <div className="px-4 py-2 justify-center flex mt-36">
          <button className="text-white" onClick={handleLogout}>
            <LogoutOutlined /> Logout
          </button>
        </div>
        
        <div className="w-full flex justify-center items-center">
        <button className="btn ml-5" type="button">
            <strong>FITNESS360</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        </div>

      </Sider>
    
    </Layout>
  );
};

export default MainSideBar;
