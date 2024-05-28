const getImageUrl = (image) => {
    if(!image){
        return null
    }
    return `https://storage.googleapis.com/zabawix-storage/uploads/${image}`

}

export default getImageUrl