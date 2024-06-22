import PropTypes from 'prop-types';

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <img src="/path/to/logo.png" alt="Logo" style={{ width: '100%' }} />
    </div>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
};

export default Logo;
