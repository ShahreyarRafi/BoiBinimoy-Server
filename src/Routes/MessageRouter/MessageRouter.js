const messageRouter = require("express").Router();
const {
  getFriends,
  messageUplodaDB,
  messageGet,
  ImageMessageSend,
  messageSeen,
  delivaredMessage,
} = require("../../Controller/MessageController/MessageController");

// get a friend or user router
messageRouter.get("/get-friends", getFriends);

// post  a new message router
messageRouter.post("/send-message", messageUplodaDB);

// get a message by id  router
messageRouter.get("/get-message/:id", messageGet);

// send image message router
messageRouter.post("/image-message-send", ImageMessageSend);

// seen message router
messageRouter.post("/seen-message", messageSeen);

// delivery message router
messageRouter.post("/delivared-message", delivaredMessage);

module.exports = messageRouter;
