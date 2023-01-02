import connectDB from "../_db/connect-db";
import {Child} from "../_db/models/Child";
import bcrypt from "bcrypt";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const filter = {};
        if (req.query.username) {
          filter.username = req.query.username;
        } else {
          res.json({error: "Access denied"});
        }
        const child = await Child.findOne(filter);
        if (!child) {
          res.status(401).json({error: "Username or password is wrong"});
        } else {
          bcrypt.compare(req.query.password, child.password, (err, isMatch) => {
            if (err) {
              return res
                .status(500)
                .send("An error occurred while comparing passwords.");
            }
            if (!isMatch) {
              // Passwords do not match, return a response indicating login failure
              return res.status(401).send("Username or password is incorrect.");
            }
          });
          res.status(200).json(child);
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
          username: body.username,
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
