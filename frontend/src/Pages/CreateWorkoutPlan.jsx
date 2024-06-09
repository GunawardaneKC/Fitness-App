import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Background from "../images/a004.jpg";
import './CreateWorkoutPlan.css';

const CreateWorkoutPlan = () => {
  // State variables to manage form inputs and user data
  const [selectedWorkout, setSelectedWorkout] = useState("Chest");
  const [exercises, setExercises] = useState("");
  const [sets, setSets] = useState("");
  const [routine, setRoutine] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState({});
  const [editWorkoutPlans, setEditWorkoutPlans] = useState(false); // Flag to determine if in edit mode
  const { workoutPlanId } = useParams(); // Getting workout plan ID from URL params
  const navigate = useNavigate();

  // Fetching a single workout plan
  useEffect(() => {
    const fetchSingleWorkoutPlan = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/workoutPlans/${workoutPlanId}`);
        // Setting fetched data to state variables
        setSelectedWorkout(data.workoutPlanName);
        setExercises(data.exercises);
        setSets(data.sets);
        setRoutine(data.routine);
        setRepetitions(data.repetitions);
        setDescription(data.description);
        setDate(data.date);
        setEditWorkoutPlans(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleWorkoutPlan();
  }, [workoutPlanId]); // Dependency array ensures this effect runs only when workoutPlanId changes

  // Fetching user data from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // Check if user is logged in

    // Validation for empty fields
    if (!selectedWorkout || !exercises || !sets || !routine || !repetitions || !description) {
      return toast.error("Please fill all the fields");
    }

    // Data for creating or updating a workout plan
    const workoutData = {
      userId: user.id,
      sets,
      routine,
      date,
      exercises,
      repetitions,
      description,
      workoutPlanName: selectedWorkout,
    };

    // Handling update or create based on editWorkoutPlans flag
    try {
      if (editWorkoutPlans) {
        const res = await axios.put(`http://localhost:8080/workoutPlans/${workoutPlanId}`, workoutData);
        if (res.status === 200) {
          toast.success("Workout Plan Updated Successfully");
          clearFields();
          navigate("/");
        }
      } else {
        const res = await axios.post(`http://localhost:8080/workoutPlans`, workoutData);
        if (res.status === 201) {
          toast.success("Workout Plan Added Successfully");
          clearFields();
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(editWorkoutPlans ? "Failed to update workout plan" : "Failed to add workout plan");
    }
  };

  // Function to clear form fields
  const clearFields = () => {
    setSets("");
    setRoutine("");
    setDate("");
    setExercises("");
    setRepetitions("");
    setDescription("");
    setSelectedWorkout("");
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 bg-white text-white bg-cover bg-center items-center justify-center flex"
  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Background})` }}
>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl  mx-auto p-6 rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        >
          <h1 className="mb-3 text-3xl font-semibold text-left text-indigo-600">
            {editWorkoutPlans ? "Edit Workout Plan" : "Create Your Workout Plan"}
          </h1>
          {/* <div className="text-center mb-4">Please select your Routine</div> */}
          <div className="grid grid-cols-3 gap-x-4">
            <div className="mb-4">
              <label htmlFor="selectedWorkout" className="block text-sm font-bold text-black">
                Select Workout
              </label>
              <select
                id="selectedWorkout"
                value={selectedWorkout}
                onChange={(e) => setSelectedWorkout(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-transparent text-black"
              >
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Arms">Arms</option>
                <option value="Legs">Legs</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="routine" className="block text-sm font-bold text-black">
                Routine
              </label>
              <input
                type="text"
                id="routine"
                value={routine}
                onChange={(e) => setRoutine(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-transparent text-black"
                placeholder="Enter routine name"
                
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exercises" className="block text-sm font-bold text-black">
                Exercise
              </label>
              <input
                type="text"
                id="exercises"
                value={exercises}
                onChange={(e) => setExercises(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-transparent text-black"
                placeholder="Enter exercise name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sets" className="block text-sm font-bold text-black">
                Sets Count
              </label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-transparent text-black"
                placeholder="Enter sets count"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="repetitions" className="block text-sm font-bold text-black">
                Repetitions
              </label>
              <input
                type="number"
                id="repetitions"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-transparent text-black"
                placeholder="Enter repetitions count"
              />
            </div>
            <div className="relative max-w-sm">
              <label htmlFor="date" className="block text-sm font-bold text-black">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className=" border border-gray-700 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-transparent text-black"
                style={{ color: "black" }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm text-black font-bold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-transparent text-white"
              placeholder="Enter description"
              rows="4"
            />
          </div>

          <button
  type="submit"
  className="rounded-lg relative w-52 h-10 ml-auto cursor-pointer flex items-center border border-blue-500 bg-blue-500 group hover:bg-blue-500 active:bg-blue-500 active:border-blue-500"
>
  <span
    className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
  >
    {editWorkoutPlans ? "Update Plan" : "Create Plan"}
  </span>
  <span
    className="absolute right-0 h-full w-10 rounded-lg bg-gray-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
  >
    <svg
      className="svg w-8 text-white"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" x2="12" y1="5" y2="19"></line>
      <line x1="5" x2="19" y1="12" y2="12"></line>
    </svg>
  </span>
</button>
        </form>
      </div>
    </Layout>

  );
};

export default CreateWorkoutPlan;


<button
  class="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
>
  <span
    class="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
    >Add Item</span
  >
  <span
    class="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
  >
    <svg
      class="svg w-8 text-white"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" x2="12" y1="5" y2="19"></line>
      <line x1="5" x2="19" y1="12" y2="12"></line>
    </svg>
  </span>
</button>
