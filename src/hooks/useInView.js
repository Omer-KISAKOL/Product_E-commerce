import { useEffect, useRef, useState } from "react";

//custom hook for splitting long product loads
const useInView = (callback) => {
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (isIntersecting) {
            callback();
        }
    }, [isIntersecting]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting);
        });
        if (ref.current) observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [ref, callback]);

    return { ref, isIntersecting };
};

export default useInView;