const ChestOpenResult = ({chestResult}) => {
    console.log(chestResult)
    return(
        <div>
            {chestResult.productTitle}
            {chestResult.hittingChances}
        </div>
    )
}

export default ChestOpenResult;
