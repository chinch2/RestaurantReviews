// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  
    const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
    const deleteResponse = await reviews.deleteOne(
      { _id: BSON.ObjectId(query.id) }
    );
    
    return deleteResponse;
  };
  