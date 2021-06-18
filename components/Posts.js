import Post from './Post'
function Posts({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          name={post.name}
          message={post.message}
          email={post.email}
          timestamp={post.timestamp}
          image={post.image}
          postImage={post.postImage}
        />
      ))}
    </div>
  )
}

export default Posts
