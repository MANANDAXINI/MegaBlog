import { useEffect, useState } from "react"
import appwriteservice from "../appwrite/auth"
import { Container,PostCard } from "../Components"

function AllPost() {
  const [posts,setpost]=useState([])
  useEffect(()=>{},[])
  appwriteservice.getPosts([]).then((posts)=>{
      if(posts){
        setpost(posts.document)
      }
  })
  
  return (

    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {
            posts.map((post)=>(
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post}/>
                </div>


            )

            )
          }

        </div>
      </Container>
      
    </div>
  )
}

export default AllPost
