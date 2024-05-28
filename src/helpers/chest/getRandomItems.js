const getRandomItems = (items, numberOfItems) => {
    let weightedArray = [];

    if(!items){
        return []
    }

    items.forEach(item => {
        for (let i = 0; i < item.hittingChances; i++) {
            weightedArray.push(item.imageName);
        }
    });

    let selectedItems = [];
    for (let i = 0; i < numberOfItems; i++) {
        const randomIndex = Math.floor(Math.random() * weightedArray.length);
        selectedItems.push(weightedArray[randomIndex]);
    }

    selectedItems.sort(() => Math.random() - 0.5);
    return selectedItems;
};

export default getRandomItems