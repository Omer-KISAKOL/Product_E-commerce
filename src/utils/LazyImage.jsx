import PropTypes from "prop-types";

const LazyImage = ({src, ...rest}) => {
    return <img {...rest} src={src}/>;
};
export default LazyImage;

LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
}