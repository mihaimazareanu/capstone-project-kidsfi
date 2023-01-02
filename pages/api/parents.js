import connectDB from "./_db/connect-db";
import {Parent} from "./_db/models/Parent";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        if (req.query.username && req.query.password) {
          const parent = await Parent.aggregate([
            {
              $match: {
                username: req.query.username,
              },
            },
            {
              $lookup: {
                from: "children",
                localField: "_id",
                foreignField: "parentID",
                as: "children",
              },
            },
          ]).exec();

          if (parent.length === 0) {
            alert("Parent not found");
            res.json({error: "User not found"});
          } else {
            res.status(200).json(parent[0]);
          }
        }
      } catch (error) {
        // You can inspect the error and return more meaningful error messages...
        res.status(500).json({error: "Access denied"});
      }
      break;
    case "POST":
      try {
        const body = req.body;
        const newParent = new Parent({
          firstName: body.firstName,
          lastName: body.lastName,
          username: body.username,
          password: body.password,
          isParent: body.isParent,
        });
        await newParent.save();
        res.status(200).json(newParent);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    case "DELETE":
    case "PUT":
    case "PATCH":
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
