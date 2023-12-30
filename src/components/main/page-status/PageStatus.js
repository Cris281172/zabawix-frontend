import React, {useEffect, useState} from "react";
import Loader from "../../parts/loader/Loader";
import PageOffline from "../page-offline/PageOffline";

const PageStatus = ({user}) => {

    const [isPageOffline, setIsPageOffline] = useState(false)

    useEffect(() => {
        let pageTimeout;
        if (user.type === undefined) {
            pageTimeout = setTimeout(() => setIsPageOffline(true), 5000);
        }

        return () => {
            if (pageTimeout) {
                clearTimeout(pageTimeout);
            }
        };
    }, [user]);

    if (user.type === undefined && isPageOffline === false) {
        return <Loader />;
    }
    if(isPageOffline){
        return <PageOffline />
    }

    return null;
}

export default PageStatus;