import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { TETabs, TETabsItem } from "tw-elements-react";
import PostsList from "../components/PostsList";
import axios from "axios";
import toast from "react-hot-toast";
import WorkoutStatus from "./WorkoutStatus";
import WorkoutPlan from "./WorkoutPlan";
import MealPlan from "./MealPlan";
import { useActiveTab } from "../context/ActiveTabContext";
import { SharedPostlist } from "../components/SharedPostlist";
import { Tabs, Tab } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import BarChartIcon from '@material-ui/icons/BarChart';


const Home = () => {
  const { activeTab, setActiveTab } = useActiveTab();
  const [user, setUser] = useState(null);
  const [reFetchPost, setReFetchPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [reFetchSharedPost, setReFetchSharedPost] = useState(false);
  

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/posts");
        setPosts(data);
      } catch (error) {
        toast.error("Server error");
      }
    };
    fetchAllPosts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const userData = localStorage.getItem("user");
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (deletedPost) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPost.id)
    );
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/posts");
        setPosts(data);
      } catch (error) {
        toast.error("Server error");
      }
    };
    fetchAllPosts();
  }, [reFetchPost]);

  useEffect(() => {
    const fetchAllSharedPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/share");
        setSharedPosts(data);
      } catch (error) {
        toast.error("Server error");
      }
    };
    fetchAllSharedPosts();
  }, [reFetchSharedPost]);

  return (
    <Layout>
      <>
     
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<PostAddIcon />} label="Daily Post" value="tab1" />
        <Tab icon={<BarChartIcon />} label="Workout Status" value="tab2" />
        <Tab icon={<FitnessCenterIcon />} label="Workout Plan" value="tab3" />
        <Tab icon={<RestaurantMenuIcon />} label="Meal Plan" value="tab4" />
      </Tabs>
 

        {activeTab === "tab1" && (
          <div>
            {posts?.map((post, index) => {
              return (
                <PostsList
                  post={post}
                  user={user}
                  key={index}
                  onUpdatePost={updatePost}
                  onDeletePost={deletePost}
                  reFetchPost={reFetchPost}
                  setReFetchPost={setReFetchPost}
                  setReFetchSharedPost={setReFetchSharedPost}
                  reFetchSharedPost={reFetchSharedPost}
                />
              );
            })}
            {sharedPosts?.map((sharePost, index) => {
              return (
                <SharedPostlist
                  post={sharePost}
                  user={user}
                  // key={index}
                  // onUpdatePost={updatePost}
                  // onDeletePost={deletePost}
                  reFetchSharedPost={reFetchSharedPost}
                  setReFetchSharedPost={setReFetchSharedPost}
                />
              );
            })}
          </div>
        )}

        {activeTab === "tab2" && (
          <div>
            {/**
             * 1. Create a new component called WorkoutStatusList
             */}
            <WorkoutStatus user={user} />
          </div>
        )}

        {activeTab === "tab3" && (
          <div>
            {/**
             * 1. Create a new component called WorkoutPlanList
             */}
            <WorkoutPlan user={user} />
          </div>
        )}

        {activeTab === "tab4" && (
          <div>
            {/**
             * 1. Create a new component called MealPlanList
             */}
            <MealPlan user={user} />
          </div>
        )}

        {/* <div>
          {posts?.map((post, index) => {
            return (
              <PostsList
                post={post}
                user={user}
                key={index}
                onUpdatePost={updatePost}
                onDeletePost={deletePost}
                reFetchPost={reFetchPost}
                setReFetchPost={setReFetchPost}
              />
            );
          })}
        </div> */}
      </>
    </Layout>
  );
};

export default Home;
