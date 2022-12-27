import connectDB from "../../_db/connect-db";
import {Child} from "../../_db/models/Child";

async function handler(req, res) {
  console.log(req.query);
  switch (req.method) {
    case "GET":
      try {
        const child = await Child.findById(req.query.childId);

        console.log(child);
        if (child) {
          return res.status(200).json(child);
        } else {
          return res.status(500).json({error: "user not found"});
        }
      } catch {
        console.log("error");
      }
      break;
    case "POST":
      try {
        await Child.findOneAndUpdate(req.body.filter, req.body.update);
        return res.status(200).json({message: "Child was updated"});
      } catch {
        return res.status(500).json({error: "user not found"});
      }

    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
