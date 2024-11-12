import PropTypes from "prop-types";

export const LoadingCircle = ({ size = '40px' }) => {
    return (
        <div
            className={`border-2 border-solid border-gray-200 border-t-2 border-t-blue-500 rounded-full animate-spin`}
            style={{
                width: size,
                height: size,
            }}
        ></div>
    );
};

LoadingCircle.propTypes = {
    size: PropTypes.string,
};