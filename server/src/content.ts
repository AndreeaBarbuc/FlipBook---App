import * as mongodb from "mongodb";
 
export interface Content {
   title: string;
   description: String,
   img:BinaryData,
   _id?: mongodb.ObjectId;
}
