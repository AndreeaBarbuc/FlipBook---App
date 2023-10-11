import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
import path from "path";
 
export const contentRouter = express.Router();
contentRouter.use(express.json());
 
contentRouter.get("/", async (_req, res) => {
   try {
       const contents = await collections.contents.find({}).toArray();
       res.status(200).send(contents);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

contentRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const content = await collections.contents.findOne(query);
  
        if (content) {
            res.status(200).send(content);
        } else {
            res.status(404).send(`Failed to find a content: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find a content: ID ${req?.params?.id}`);
    }
 });

 contentRouter.post("/", async (req, res) => {
    try {
        
        const content = req.body;
        const result = await collections.contents.insertOne(content);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new content: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new content.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

contentRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const content = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.contents.updateOne(query, { $set: content });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an content: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an content: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an content: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

contentRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.contents.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an content: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an content: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an content: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });