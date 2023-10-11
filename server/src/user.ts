import * as mongodb from "mongodb";
 
export interface User {
   name: string;
   role: "admin" | "agent" | "user";
   _id?: mongodb.ObjectId;
}