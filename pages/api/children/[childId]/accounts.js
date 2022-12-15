import connectDB from "../../_db/connect-db";
import {Child} from "../../_db/models/Child";
// import {Account} from "../../_db/models/Account";

async function handler(req, res) {
  switch (req.method) {
    // case "GET":
    //   try {
    //     const filter = {};
    //     if (req.query._id) {
    //       filter._id = req.query._id;
    //       // filter.lastName = req.query.lastName;
    //       // filter.password = req.query.password;
    //     }
    //     const children = await Child.find(filter);
    //     res.status(200).json(children[0]);
    //   } catch (error) {
    //     // You can inspect the error and return more meaningful error messages...
    //     res.status(500).json({error: "something went wrong"});
    //   }
    //   break;
    case "POST":
      try {
        const child = await Child.findById(req.query.childId);

        if (child.accounts) {
          child.accounts.push(req.body);
        } else {
          child.accounts = [req.body];
        }
        console.log(child.accounts);
        console.log(req.body);
        await child.save();
        res.status(200).json(child);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;

    // try {
    //   const body = req.body;
    //   const newAccount = new Account({
    //     name: body.name,
    //     amount: body.amount,
    //   });
    //   await newAccount.save();
    //   res.status(200).json(newAccount);
    // } catch (error) {
    //   res.status(500).json({error: error.message});
    // }
    // break;
    // case "DELETE":
    // case "PUT":
    // case "PATCH":
    //   try {
    //     // return res.status(200).json({id: req.query.childID, body: req.body});
    //     const child = await Child.findById(req.query.childID);

    //     if (child.accounts) {
    //       child.accounts.push(req.body);
    //     } else {
    //       child.accounts = [req.body];
    //     }
    //     console.log(req.body);
    //     await child.save();
    //     res.status(200).json(child);
    //   } catch (error) {
    //     res.status(500).json({error: error.message});
    //   }
    //   break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
