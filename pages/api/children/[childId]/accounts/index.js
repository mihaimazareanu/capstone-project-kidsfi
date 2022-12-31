import connectDB from "../../../_db/connect-db";
import {Child} from "../../../_db/models/Child";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const child = await Child.findById(req.query.childId);
        if (child) {
          return res.status(200).json(child.accounts);
        } else {
          return res.status(500).json({error: "user not found"});
        }
      } catch {
        console.log("error");
      }
      break;
    case "POST":
      try {
        const child = await Child.findById(req.query.childId);
        if (child.accounts) {
          child.accounts.push(req.body);
        } else {
          child.accounts = [req.body];
        }
        await child.save();
        res.status(200).json(child);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
