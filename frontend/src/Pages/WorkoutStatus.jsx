import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const WorkoutStatus = ({ user }) => {
  const [workoutStatuses, setWorkoutStatuses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutStatuses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/workoutStatus");
        if (res.status === 200) {
          setWorkoutStatuses(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch workout statuses");
      }
    };
    fetchWorkoutStatuses();
  }, []);

  const deleteWorkOut = async (status) => {
    try {
      await axios.delete(
        `http://localhost:8080/workoutStatus/${status.statusId}`
      );

      setWorkoutStatuses((prevStatuses) =>
        prevStatuses.filter((s) => s.statusId !== status.statusId)
      );

      toast.success("Workout status deleted successfully");
    } catch (error) {
      toast.error("Failed to delete workout status");
    }
  };

  const navigateEditPage = (status) => {
    navigate(`/CreateWorkoutStatus/${status.statusId}`);
  };

  return (
    <div
  className="container mx-auto p-4 min-h-screen"
  style={{
   backgroundColor: "#f9fafb",
    
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  }}
>
      <div className="flex justify-between items-center">
        {/* <h1 className="text-3xl text-center font-semibold mb-4">
          Workout Statuses
        </h1> */}
      </div>

      <div className="space-y-4 flex justify-center flex-col items-center">
        {workoutStatuses.map((status, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 w-[600px] hover:scale-105 hover:duration-150 duration-150  "
          >
            <div className="flex justify-between ">
              <div className="flex gap-3">
                <div>
                  <img
                    src={status?.userProfile}
                    alt="user"
                    className="w-14 h-14 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{status?.username}</h2>
                  <p className="text-sm font-bold mb-2">
                    Workout on {status.date}
                  </p>
                </div>
              </div>
              <div className="gap-3 flex">
                {user?.id === status?.userId && (
                  <>
                  <button className="bin-button" onClick={() => deleteWorkOut(status)}>
                  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 39 7"
    class="bin-top"
  >
    <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
    <line
      stroke-width="3"
      stroke="white"
      y2="1.5"
      x2="26.0357"
      y1="1.5"
      x1="12"
    ></line>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 33 39"
    class="bin-bottom"
  >
    <mask fill="white" id="path-1-inside-1_8_19">
      <path
        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
      ></path>
    </mask>
    <path
      mask="url(#path-1-inside-1_8_19)"
      fill="white"
      d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
    ></path>
    <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
    <path stroke-width="4" stroke="white" d="M21 6V29"></path>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 89 80"
    class="garbage"
  >
    <path
      fill="white"
      d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
    ></path>
  </svg>
</button>


                    <button className="editBtn" onClick={() => navigateEditPage(status)}>
                      <svg height="1em" viewBox="0 0 512 512">
                      <path
      d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
    ></path>
                      </svg>
                    </button>

                  </>
                )}
              </div>
            </div>



            <div className="grid grid-cols-2 list-disc pl-5 space-y-1 mt-2">
  <span>Distance run</span>
  <span>:{status.distance}<span className="text-black text-xs">Km </span></span>

  <span>Number of push-ups</span>
  <span>:{status.pushUps}</span>

  <span>Weight lifted</span>
  <span>:{status.weight}<span className="text-black text-xs">Kg </span></span>
</div>
            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-200">
            {status.description}
                </p>
          </div>
        ))}
      </div>
    </div>
    // </Layout>
  );
};

export default WorkoutStatus;
