import connectDB from "./_db/connect-db";
import {User} from "./_db/models/User";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const filter = {};
        if (req.query._id) {
          filter._id = req.query._id;
        }
        const users = await User.find({filter});
        res.status(200).json(users);
      } catch (error) {
        // You can inspect the error and return more meaningful error messages...
        res.status(500).json({error: "something went wrong"});
      }
      break;
    case "POST":
      try {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          isParent: req.body.parent,
          isChild: req.body.child,
        });
        await newUser.save();
        res.status(200).json(newUser);
        console.log(newUser);
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
