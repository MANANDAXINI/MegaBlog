
import appwriteservice from "../appwrite/config"
import {Link} from "react-router-dom"

function Postcards({$id,title,featuredimage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
                <img src={appwriteservice.getFilePreview(featuredimage)} alt={title} className="rounded-xl" />
            </div>
            <h2 className="text-gray-100 text-xl">{title}</h2>
        </div>
    </Link>
  )
}

export default Postcards
