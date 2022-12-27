import connectDB from "./_db/connect-db";
import {Parent} from "./_db/models/Parent";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        // const filter = {};
        // if (req.query.firstName) {
        //   filter.firstName = req.query.firstName;
        //   filter.lastName = req.query.lastName;
        //   filter.password = req.query.password;
        // }

        // const parents = await Parent.find(filter);
        // console.log(parents);
        // res.status(200).json(parents[0]);

        const parent = await Parent.aggregate([
          {
            $match: {
              firstName: req.query.firstName,
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
          throw new Error("User not found");
        } else {
          res.status(200).json(parent[0]);
        }
      } catch (error) {
        // You can inspect the error and return more meaningful error messages...
        res.status(500).json({error: "something went wrong"});
      }
      break;
    case "POST":
      try {
        const body = req.body;
        const newParent = new Parent({
          firstName: body.firstName,
          lastName: body.lastName,
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
