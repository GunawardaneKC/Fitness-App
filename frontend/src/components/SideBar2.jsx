// SideBar2.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar2 = ({ logUser }) => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
   <div className="max-lg:hidden">
  <div className="flex flex-col min-h-screen items-center">
    <aside className="right-0 fixed lg:w-[250px] w-[250px] border-r border-r-dashed border-r-neutral-200 bg-[#001529]  text-black shadow-lg h-full">
      <h1 className="text-center font-bold text-lg m-5 text-white">Suggestions</h1>

      <div className="flex flex-col gap-5 ml-8">
        {users?.map((user, index) => {
          return logUser?.id !== user?.id ? (
            <div
              key={index}
              className="flex items-center gap-5 cursor-pointer hover:bg-gray-200 hover:text-gray-800 p-2 rounded-lg"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <img
                src={user.profileImage}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <h1 className="font-bold text-gray-300">{user.name}</h1>
            </div>
          ) : null;
        })}
      </div>
    </aside>
  </div>
</div>
  );
};
export default SideBar2;

