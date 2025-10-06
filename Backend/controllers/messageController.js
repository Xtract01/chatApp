import { Conversations } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    let gotConversation = await Conversations.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversations.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await gotConversation.save();
    return res.status(200).json({ msg: "Message sent successfully" });
    //Socket.io integration will be here
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversations.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json({ messages: [] });
    }
    return res.status(200).json({ messages: conversation.messages });
  } catch (err) {
    res.status(500).json(err);
  }
};
