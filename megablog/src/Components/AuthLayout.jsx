import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    if (authStatus === true && !authentication) {
      navigate('/');
    } else if (authStatus === false && authentication) {
      navigate('/login');
    }
    
    const timer = setTimeout(() => setLoader(false), 500);
    return () => clearTimeout(timer);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

// Define prop types for the component
Protected.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool,
};

// Define default values for props
Protected.defaultProps = {
  authentication: true,
};
