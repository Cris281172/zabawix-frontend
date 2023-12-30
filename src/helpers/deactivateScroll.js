const deactivateScroll = (scrollStatus) => {
    if(scrollStatus === true){
        document.body.style.overflow = 'hidden';
    }
    else{
        document.body.style.overflow = 'visible';
    }
}

export default deactivateScroll