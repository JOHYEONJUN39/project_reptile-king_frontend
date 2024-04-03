import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Post } from '../types/Board';
import BoardCategory from '../components/Board/BoardCategory';
import PopularPosts from '../components/Board/PopularPosts';
import { BiSolidLike } from 'react-icons/bi';
import { FaCommentDots } from 'react-icons/fa6';
import { MdRemoveRedEye } from 'react-icons/md';
import QuillEditorReader from '../components/Board/QuillEditorReader';

function BoardDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const postsResponse = await axios.get('http://localhost:8080/api/posts'); // 실제 api
        const postsResponse = await axios.get(`http://localhost:3300/posts/${postId}`); // json server
        setPost(postsResponse.data);
      } catch (err) {
        alert("잘못된 경로입니다!");
        navigate("/board");
      }
    };

    fetchPosts();
  }, [postId, navigate]);

  return (
    <div className="laptop:w-[75rem] w-body m-auto flex min-h-dvh">
      {post ? (
        <>
          <BoardCategory />
          <div className="laptop:w-[47.6875rem] w-mainContent">
            <div className="bg-gray-200 px-5 mt-28 mb-5 rounded">
              <div className="pb-4">
                <button className="mt-2 mb-4" onClick={() => navigate(-1)}>← Go back</button>
                <div className="mb-4 flex justify-between">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      by {post.user_id} • {post.created_at} • <MdRemoveRedEye className="inline-block text-black" /> {post.views} • <FaCommentDots className="inline-block text-black" /> 댓글 수 • <BiSolidLike className="inline-block text-black" /> {post.likes}
                    </div>
                  </div>
                  {/* 사용자 프로필 사진 서버에서 가져오기 */}
                  <img src="/src/assets/profile.png" alt="프로필 사진" className="w-12 h-12" />
                </div>
                {/* <p>{post.content}</p> */}
                {/* <div dangerouslySetInnerHTML={{ __html: post.content}}></div> */}
                <QuillEditorReader post={post} />
              </div>
            </div>
          </div>
          <PopularPosts />
        </>
      ) : null}
    </div>
  )
}

export default BoardDetail;
