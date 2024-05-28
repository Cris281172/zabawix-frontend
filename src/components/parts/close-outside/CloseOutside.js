import React, {useEffect, useRef} from 'react';

const CloseOutside = ({ refs, handleClose, children, ...forwardProps }) => {

    const outsideRef = useRef(null);

    const handleClickOutside = event => {

        if (outsideRef.current) {

            let close = true;

            const ignoredRefs = Array.isArray(refs) ? [outsideRef, ...refs] : [outsideRef];

            ignoredRefs.forEach(el => {

                if (el.current && el.current.contains(event.target)) {

                    close = false;

                }

            });

            if (close) {

                handleClose();

            }

        }

    };

    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);

        return () => {

            document.removeEventListener("mousedown", handleClickOutside);

        };

    }, [outsideRef]);

    return (
        <div ref={outsideRef} {...forwardProps}>
            {children}
        </div>
    );

};

export default CloseOutside;
