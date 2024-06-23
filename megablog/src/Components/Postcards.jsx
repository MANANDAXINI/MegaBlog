import PropTypes from 'prop-types';
import appwriteservice from '../appwrite/config';
import { Link } from 'react-router-dom';

function Postcards({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteservice.getFilePreview(featuredimage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-gray-700 text-xl">{title}</h2>
      </div>
    </Link>
  );
}

Postcards.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredimage: PropTypes.string.isRequired,
};

export default Postcards;
