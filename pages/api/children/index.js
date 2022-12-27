import connectDB from "../_db/connect-db";
import {Child} from "../_db/models/Child";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const filter = {};
        if (req.query.firstName) {
          filter.firstName = req.query.firstName;
        }
        const children = await Child.findOne(filter);
        if (children.length === 0) {
          throw new Error("User not found");
        } else {
          res.status(200).json(children);
        }
      } catch (error) {
        // You can inspect the error and return more meaningful error messages...
        res.status(500).json({error: "something went wrong"});
      }
      break;
    case "POST":
      try {
        const body = req.body;
        const newChild = new Child({
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
          isChild: body.isChild,
          parentID: body.parentID,
        });
        await newChild.save();
        res.status(200).json(newChild);
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
