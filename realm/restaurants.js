// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  
    const {restaurantsPerPage = 20, page = 0} = query;

    let queryFilters = {};
    if (query.cuisine) {
      queryFilters = { cuisine: { $eq: query.cuisine } };
    } else if (query.zipcode) {
      queryFilters = { "address.zipcode": { $eq: query.zipcode } };
    } else if (query.name) {
      queryFilters = { $text: { $search: query.name } };
    }
    
    const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    let restaurantsList = await collection.find(queryFilters).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray();
    
    restaurantsList.forEach(restaurant => {
      restaurant._id = restaurant._id.toString();
    });
    
    let totalRestaurantsCount = await collection.count(queryFilters);

    let responseData = {
      restaurants: restaurantsList,
      page: page.toString(),
      filters: {},
      entries_per_page: restaurantsPerPage.toString(),
      total_results: totalRestaurantsCount.toString(),
    };
  
    return  responseData;
};
