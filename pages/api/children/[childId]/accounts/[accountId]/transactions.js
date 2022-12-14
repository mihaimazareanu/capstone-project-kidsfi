import connectDB from "../../../../_db/connect-db";
import {Child} from "../../../../_db/models/Child";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const child = await Child.findById(req.query.childId);
        if (child.accounts) {
          child.accounts
            .find(
              account =>
                JSON.stringify(account._id) ===
                JSON.stringify(req.body.accountId)
            )
            .transactions.push(req.body.transaction);
        } else {
          console.log("error");
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
