// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
  
    if (body) {
      const reqBody = EJSON.parse(body.text());
      const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
      const date = new Date();
      
      const updateResponse = await reviews.updateOne(
        { user_id: reqBody.user_id, _id: BSON.ObjectId(reqBody.review_id) },
        { $set: { text: reqBody.text, date: date } }
      );
      
      return updateResponse;
    }
    
    return {};
  };
  