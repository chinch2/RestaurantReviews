// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  
    const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    const cuisines = await collection.distinct("cuisine");
    
    return cuisines
  };
  