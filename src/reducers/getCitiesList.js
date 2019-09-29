export default (citiesList = [], action) => {
    if (action.type === "CITIES_SUGGESTIONS"){
        return action.payload;
    }

    return citiesList;
}