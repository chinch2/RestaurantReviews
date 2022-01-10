// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  
    if (body) {
      const reqBody = EJSON.parse(body.text());
      const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
      
      const reviewDoc = {
        name: reqBody.name,
        user_id: reqBody.user_id,
        date: new Date(),
        text: reqBody.text,
        restaurant_id: BSON.ObjectId(reqBody.restaurant_id)
      };
      
      return await reviews.insertOne(reviewDoc);
    }
    
    return {};
  };
  