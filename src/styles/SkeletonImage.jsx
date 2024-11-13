import PropTypes from "prop-types";

export const Skeleton = ({ width = '300px', height = '385px', borderRadius = '8px' }) => {
    return (
        <div
            className={`bg-gray-400/70 animate-pulse w-[300px] h-[385px] rounded-xl shadow-md mx-10 my-4`}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
            }}
        ></div>
    );
};

Skeleton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
};