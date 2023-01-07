import React, {useState, useEffect} from 'react'
import Create from './Create'

const Posts = (props)=> {
    const posts = props.posts
    const token = props.token
    const setPosts = props.setPosts

    const [postId, setPostId] = useState(null);

    const handleDelete = async (postIdToDelete) => {
        console.log('postIdToDelete:', postIdToDelete)
        const response = await fetch
        (`https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts/${postIdToDelete}`,{
  method: "DELETE",
  headers:{
    'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
  }
})
const data = response.json();
console.log('data:', data)
if(data){
    const newPosts = posts.filter(post=> post._id !== postIdToDelete);
    setPosts(newPosts)
}
    }

    return <>
    <h1>Posts</h1>
    {
      postId
      ? <Update token={token} posts={posts} setPosts={setPosts} postId={postId} 
      setPostId={setPostId}/>
      :<Create token={token} posts={posts} setPosts={setPosts}/>
    }
    {posts.map((post) => {
      return (
      <div key={post._id}>
        className={post.isAuthor ? 'singlePost': 'singlePost'}
        <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>Price: {post.price}</p>
          <p>Location: {post.location}</p>
          <p>Will Deliver{post.willDeliver}</p>
          {post.isAuthor ? <button type="button"
          className="btn btn-outline-primary" 
          onClick={()=> setPostId(post._id)}>Edit</button>:null}
           {post.isAuthor ? <button type="button"
          className="btn btn-outline-primary" 
          onClick={()=> handleDelete(post._id)}>Delete</button>:null}
      </div>
      );
    })}
  
  </>
}

  




export default Posts