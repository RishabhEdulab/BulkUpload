import express, { Response, Request, json } from "express";
import dotenv from "dotenv";
import AapDataSource from "./auth/DataSource";
import multer from "multer";
import * as xlsx from "xlsx";
import Employee from "./entities/Employee";
import Address from "./entities/Address";
import PaymentDetails from "./entities/PaymentDetails";

dotenv.config();
const port = process.env.PORT;
if (!port) throw new Error(`port is undefined ${port}`);
const app = express();
//Connection is established
AapDataSource.initialize()
  .then(() => console.log("connection is established"))
  .catch((e) => console.log(`Connection is not established ${e.message}`));
//CLOSE connection is established
var upload = multer({ dest: "./uploads" });
app.get("/Get", (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world" });
});
const employeeRepository = AapDataSource.getRepository(Employee);
const addressRepository = AapDataSource.getRepository(Address);
const paymentDetailsRepository = AapDataSource.getRepository(PaymentDetails);
app.post(
  "/read",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      // var employeeArray = [];
      // var addressArray = [];
      // var paymentDetailsArray:any = [];

      if (req.file?.filename == null || req.file?.filename == undefined) {
        return res.status(400).json("No file");
      }

      const workBook = xlsx.readFile(req.file.path);

      const workSheet = workBook.Sheets[workBook.SheetNames[0]];

      const jsonData: any = xlsx.utils.sheet_to_json(workSheet);
      const emp = jsonData.map((row: any) => {
        const { name, email, age } = row;
        return employeeRepository.create({ name, email, age });
      });
      
      
      await employeeRepository.save(emp);
    
      const addr = jsonData.map((row: any,index:number) => {
        const { address } = row;
        const emps = emp[index];
        return addressRepository.create({ address, employeeId: emps.id });
      });
      
      const paymentDet = jsonData.map((row: any,index:number) => {
        const { PaymentStatus, PaymentAmount, PaymentDate } = row;
        const em = emp[index];
       
        return paymentDetailsRepository.create({
          PaymentStatus,
          PaymentAmount:Number(PaymentAmount),
          PaymentDate,
          employeeId: em.id,
        });
      });
      await addressRepository.save(addr);
      console.log("paymentDet",paymentDet)
      await paymentDetailsRepository.save(paymentDet);
     
      

      res.status(200).send("Data saved successfully.");
    } catch (error) {
      res.status(500);
    }
  }
);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
