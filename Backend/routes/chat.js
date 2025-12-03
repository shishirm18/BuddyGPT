import express from "express";
import Thread from "../models/thread.js"
import getOpenAIAPIResponse from "../utils/openai.js"

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

// Get single threads
router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
        const thread = await Thread.findOne({threadId});
        if (!thread){
            res.status(404).json({error: "Thread not found"});
        }
        res.json(thread.messages);
    } catch(err) {
        console.log(err);
        res.send(500).json({error: "Failed to get the chat"});
    }
})

// Delete single threads
router.delete("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if (!deletedThread){
            res.status(404).json({error: "Thread not found"});
        }
        res.status(200).json({sucess: "Thread deleted successfully!"});
    } catch(err) {
        console.log(err);
        res.send(500).json({error: "Failed to delete the thread"});
    }
})

//New Chat or New Message for existing ThreadId
router.post("/chat", async(req, res) => {
    const {threadId, message} = req.body;       
    
    if(!threadId || !message){
        res.status(404).json({error: "missing required fields"})
    }

    try{
        const thread = await Thread.findOne({threadId});
        if(!thread){
            //create a new thread
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            })
        } else {
            thread.messages.push({role: "user", content: message})
        }

        const assistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply})
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply: assistantReply})
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "something went wrong"})
    }
});

export default router;