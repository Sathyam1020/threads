
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

async function Home(){
  const result = await fetchPosts(1, 30); 
  const user = await currentUser(); 
  return (
    <div>
      <h1 className="head-text text-left">
        Home
      </h1>
      <section className='mt-9 flex flex-col gap-10'>
        {
          result?.posts.length === 0 ? (
            <p className="no-result">No Threads found</p>
          ) : (
            <div>
              {
                result?.posts.map((post) => {
                  return (
                    <ThreadCard  
                      key={post._id}
                      id={post._id}
                      currentUserId = {user?.id || ""}
                      parentId = {post.parentId}
                      content = {post.text}
                      author = {post.author}
                      createdAt = {post.createdAt}
                      comments = {post.children}
                      community = {post.community}
                    />
                  )
                })
              }
            </div>
          )
        }
      </section>
    </div>
  )
}

export default Home;