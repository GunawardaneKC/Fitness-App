import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const WorkoutPlan = ({ user }) => {  // State variable to manage fetched workout plans
  const [workoutPlans, setWorkoutPlans] = useState([]);

  const navigate = useNavigate();


   // Fetching workout plans
  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const res = await axios.get("http://localhost:8080/workoutPlans");
        if (res.status === 200) {
          setWorkoutPlans(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch workout plans");
      }
    };
    fetchWorkoutPlans();
  }, []);

  // Delete Workout Plans by ID
  const deleteWorkOutPlan = async (workoutplans) => {
    try {
      await axios.delete(
        `http://localhost:8080/workoutPlans/${workoutplans.workoutPlanId}`
      );

       // Updating state after deletion
      setWorkoutPlans((prevWokoutPlans) =>
        prevWokoutPlans.filter((wp) => wp.workoutPlanId !== workoutplans.workoutPlanId)
      );

      toast.success("Workout Plan deleted successfully");
    } catch (error) {
      toast.error("Failed to delete workout Plan");
    }
  };

    // Navigate to edit page
  const navigateEditPage = (workoutplans) => {
    navigate(`/CreateWorkoutPlan/${workoutplans.workoutPlanId}`);
  };

  return (
    <div className="min-h-screen bg-white text-white">
      <div className="container mx-auto p-4">
        <div className="space-y-4 flex justify-center flex-col items-center">
          {workoutPlans.map((workoutplans, index) => (
            <div key={index} className="p-4 mb-4 w-[600px] notification">
              <div class="notiglow"></div>
              <div class="notiborderglow"></div>
              <div className="flex justify-between notibody ">
                <div className="flex gap-3">
                  <div>
                    <img
                      src={workoutplans?.userProfile}
                      alt="user"
                      className="w-14 h-14 rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {workoutplans?.username}
                    </h2>
                    <p className="text-sm font-bold mb-2">
                      Workout on {workoutplans.date}
                    </p>
                  </div>
                </div>
                <div className="gap-3 flex">
                  {user?.id === workoutplans?.userId && (
                    <>
                      <button className="relative h-10 px-5 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                        onClick={() => deleteWorkOutPlan(workoutplans)}
                      >
                        Delete 
                      </button>


                      <button className="relative h-10 px-5 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-green-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                        onClick={() => navigateEditPage(workoutplans)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className='notibody'>
                <div className="list-disc pl-5 space-y-1 mt-2">
                  <h2 className="text-xl font-semibold mb-2">
                    Workout Plan Name:{workoutplans.workoutPlanName}
                  </h2>
                  <p className="font-medium">
                    Exercise: {workoutplans.exercises}
                  </p>
                  <p className="text-sm">Sets: {workoutplans.sets}</p>
                  <p className="text-sm">
                    Repetitions: {workoutplans.repetitions}
                  </p>
                  <p className="text-sm">Routine: {workoutplans.routine}</p>
                  <p className="text-sm italic">"{workoutplans.description}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;



