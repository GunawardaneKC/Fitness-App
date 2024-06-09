import axios from "axios";
import TimeAgo from "./TimeAgo";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import { MdOutlineInsertComment } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const PostsList = ({
  post,
  user,
  onUpdatePost,
  onDeletePost,
  reFetchPost,
  setReFetchPost,
  setReFetchSharedPost,
  reFetchSharedPost,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [shareDescription, setShareDescription] = useState("");

  const navigate = useNavigate();
  const likeBtnClick = async (post) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/posts/like?postId=${post.id}&userId=${user.id}`
      );
      console.log(res.data);
      setReFetchPost(!reFetchPost);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateEditPage = () => {
    navigate(`/post/${post.id}`);
  };

  const deletePost = async (post) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${post.id}`);
      setReFetchPost(!reFetchPost);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const commentAdd = async (e) => {
    e.preventDefault();
    if (!comment) return toast.error("Comment is required");

    if (editComment) {
      try {
        await axios.put(
          `http://localhost:8080/posts/${post.id}/comments/${commentId}`,
          {
            content: comment,
          }
        );
        setComment("");
        setCommentId(null);
        setEditComment(false);
        setReFetchPost(!reFetchPost);
        toast.success("Comment updated successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `http://localhost:8080/posts/${post.id}/comments`,
          {
            commentBy: user.name,
            commentById: user.id,
            commentByProfile: user.profileImage,
            content: comment,
          }
        );
        if (res.data) {
          setComment("");
          setReFetchPost(!reFetchPost);
          toast.success("Comment added successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteComment = async (comment) => {
    try {
      await axios.delete(
        `http://localhost:8080/posts/${post.id}/comments/${comment.id}`
      );
      toast.success("Comment deleted successfully");
      setReFetchPost(!reFetchPost);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = (comment, postId) => {
    setComment(comment.content);
    setEditComment(true);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/share`, {
        description: shareDescription,
        userid: user.id,
        postId: post.id,
      });
      if (res.data) {
        setShareModal(false);
        toast.success("Post shared successfully");
        setReFetchSharedPost(!reFetchSharedPost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="h-full w-full bg-gray-50 flex items-center justify-center">
        <div className="border max-w-screen-md   mt-6 rounded-2xl p-4 card">
          <div className="flex items-center	justify-between">
            <div className="gap-3.5	flex items-center ">
              <img
                src={post?.userProfile}
                alt=""
                className="object-cover bg-yellow-500 rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <b className="mb-2 capitalize">{post?.username}</b>
                <time datetime="06-08-21" className="text-gray-400 text-xs">
                  <TimeAgo date={post?.date} />
                </time>
              </div>
            </div>
            <div className="rounded-full h-3.5 flex	items-center justify-center gap-3">
              {user?.id === post?.userId && (
                <>
                 <button className="bin-button" onClick={() => deletePost(post)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" className="bin-top">
                    <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
                    <line strokeWidth="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" className="bin-bottom">
                    <mask fill="white" id="path-1-inside-1_8_19">
                      <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                    </mask>
                    <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                    <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
                    <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" className="garbage">
                    <path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"></path>
                  </svg>
                </button>
                  <AiFillEdit
                    size={20}
                    color="blue"
                    className="cursor-pointer"
                    onClick={navigateEditPage}
                  />
                </>
              )}
            </div>
          </div>
          <div className="whitespace-pre-wrap mt-7 font-bold ">
            {post?.title}
          </div>
          <p className="mt-1 text-sm text-gray-700">{post?.description}</p>
          <div className="mt-5 flex gap-2	 justify-center border-b pb-4 flex-wrap	w-[600px] max-w-[700px]">
            {post?.images?.length === 3 ? (
              <>
                <img
                  src={post.images[0]}
                  alt=""
                  className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                />
                <img
                  src={post.images[1]}
                  alt=""
                  className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                />
                <img
                  src={post.images[2]}
                  alt=""
                  className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                />
              </>
            ) : post?.images?.length === 2 ? (
              <>
                <img
                  src={post.images[0]}
                  alt=""
                  className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                />
                <img
                  src={post.images[1]}
                  alt=""
                  className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                />
              </>
            ) : post?.images?.length === 1 ? (
              <img
                src={post.images[0]}
                alt=""
                className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
              />
            ) : (
              <>
                <video
                  controls
                  className="mt-3"
                  style={{ maxWidth: "570px", height: "auto" }}
                >
                  <source src={post?.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </div>
          <div className=" h-16 border-b  flex items-center justify-around	">
            <div className="flex items-center	gap-3	cursor-pointer">
              {post?.likedBy?.includes(user?.id) ? (
                <>
                  <FaHeart
                    size={24}
                    color="red"
                    onClick={() => likeBtnClick(post)}
                  />
                   <p> {post?.likeCount} Like</p>
                </>
              ) : (
                <>
                 <div className="con-like mt-5">
                <input className="like" type="checkbox" title="like" onClick={() => likeBtnClick(post)} />
                <div className="checkmark">
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="filled" viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="celebrate">
                    <polygon className="poly" points="10,10 20,20"></polygon>
                    <polygon className="poly" points="10,50 20,50"></polygon>
                    <polygon className="poly" points="20,80 30,70"></polygon>
                    <polygon className="poly" points="90,10 80,20"></polygon>
                    <polygon className="poly" points="90,50 80,50"></polygon>
                    <polygon className="poly" points="80,80 70,70"></polygon>
                  </svg>
                </div>
              </div>
                </>
              )}
             
            </div>
            <div
              className="flex items-center	gap-3 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <MdOutlineInsertComment size={24} color="blue" />
              <p className="text-blue-900 ">{post?.comments?.length} Comment</p>
            </div>

            <div
              className="flex items-center	gap-3 cursor-pointer"
              onClick={() => setShareModal(true)}
            >
              <FaShareFromSquare size={22} />
              <p> Share</p>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[550px] h-[600px] px-10 justify-between py-10">
                <div className="text-center font-bold text-xl flex justify-between ">
                  <h1 className="text-blue-800">Comments</h1>
                  <IoClose
                    color="red"
                    size={28}
                    className="cursor-pointer"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className=" h-[400px] overflow-y-scroll ">
                  <div className="flex flex-col gap-8 justify-center">
                    {post.comments?.length > 0 ? (
                      post?.comments?.map((comment) => (
                        <div className="flex items-center  justify-between">
                          <div className="flex gap-5">
                            <div className="flex justify-center items-center">
                              <img
                                src={comment?.commentByProfile}
                                alt=""
                                className="object-cover bg-yellow-500 rounded-full w-14 h-14"
                              />
                            </div>
                            <div className="flex flex-col">
                              <b className="capitalize">{comment?.commentBy}</b>
                              <time
                                datetime="06-08-21"
                                className="text-gray-400 text-xs"
                              >
                                <TimeAgo date={comment?.createdAt} />
                              </time>
                              <p className="mt-1 text-base">
                                {comment?.content}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-5 px-5">
                            {user?.id === comment?.commentById && (
                              <>
                                <AiFillDelete
                                  onClick={() => deleteComment(comment)}
                                  size={20}
                                  color="red"
                                  className="cursor-pointer"
                                />
                                <AiFillEdit
                                  onClick={() => {
                                    handleEditComment(comment, post.id);
                                    setCommentId(comment.id);
                                  }}
                                  size={20}
                                  color="blue"
                                  className="cursor-pointer"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-2xl text-gray-400">
                        No comments yet
                      </div>
                    )}
                  </div>
                </div>
                <form onSubmit={commentAdd} className="flex">
                  <input
                    type="text"
                    className="px-2 w-full h-10 border"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white w-20 h-10"
                  >
                    {<>{editComment ? "Update" : "Add"} </>}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {shareModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[550px] h-[300px] px-10 justify-between py-10">
                <div className="text-center font-bold text-xl flex justify-between ">
                  <h1 className="text-blue-800">Share</h1>
                  <IoClose
                    color="red"
                    size={28}
                    className="cursor-pointer"
                    onClick={() => setShareModal(false)}
                  />
                </div>
                <form className="flex flex-col" onSubmit={handleShare}>
                  <textarea
                    className="border h-32 p-2"
                    placeholder="Write something"
                    onChange={(e) => setShareDescription(e.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white mt-4 h-8"
                  >
                    Share
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default PostsList;
