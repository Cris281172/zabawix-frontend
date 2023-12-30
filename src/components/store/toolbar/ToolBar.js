const ToolBar = ({total, setMoreFiltersVisible}) => {
    return(
        <div>
            <div>
                {total}
            </div>
            <button onClick={() => setMoreFiltersVisible(true)}>
                Więcej filtrów
            </button>
        </div>
    )
}

export default ToolBar;