import connectDB from "../../../../_db/connect-db";
import {Child} from "../../../../_db/models/Child";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const child = await Child.findById(req.query.childId);

        if (child) {
          const account = child.accounts.find(
            account =>
              JSON.stringify(account._id) ===
              JSON.stringify(req.query.accountId)
          );
          return res.status(200).json(account);
        } else {
          return res.status(500).json({error: "account not found"});
        }
      } catch {
        console.log("error");
      }
      break;

    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
