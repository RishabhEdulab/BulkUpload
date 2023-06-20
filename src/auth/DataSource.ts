import { DataSource } from "typeorm"
import Employee from '../entities/Employee'
import Address from '../entities/Address'
import PaymentDetails from '../entities/PaymentDetails'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.MYSQL_PORT;
if (!port) throw new Error(`port is undefined ${port}`);
const host = process.env.HOST;
if (!host) throw new Error(`host is undefined ${host}`);
const username = process.env.USERNAME_1;
if (!username) throw new Error(`username is undefined ${username}`);
const password = process.env.PASSWORD;
if (!password) throw new Error(`password is undefined ${password}`);
const database = process.env.DATABASE;
if (!database) throw new Error(`database is undefined ${database}`);


const AapDataSource =new DataSource({
    type:"mysql",
    host:host,
    port:Number(port),
    username:username,
    password:password,
    database:database,
    synchronize: true,
    logging: false,
    entities:[Employee,Address,PaymentDetails]
    
})
export default AapDataSource