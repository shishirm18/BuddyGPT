import express from "express";
import Thread from "../models/thread.js"

const router = express.Router();

//test
router.post("/test", async(req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "Testing New Thread 2"
        });

        const response = await thread.save();
        res.send(response);

    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"});
    }
})

// Get all threads
router.get("/thread", async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        // descending order of updatedAt...most recent data on the top
        res.json(threads);
    } catch(err) {
        console.log(err);
        res.send(500).json({error: "Failed to get all threads"});
    }
})

export default router;