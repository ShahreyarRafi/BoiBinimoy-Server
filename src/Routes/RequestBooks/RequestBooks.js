const express = require("express");
const { getAllRequestBooksController, getOneRequestBooksController, postRequestBooksController, updateRequestBooksController, deleteRequestBooksController } = require("../../Controller/RequestBooks/RequestBooks");

const  requestBooksRouter = express.Router();


// get all request books route
requestBooksRouter.get("/request-books", getAllRequestBooksController);


// get a request book route
requestBooksRouter.get("/request-books/:id", getOneRequestBooksController);


// post a request book route
requestBooksRouter.post("/request-books", postRequestBooksController);


// update request book route
requestBooksRouter.patch("/request-books/:id", updateRequestBooksController);


// delete  request book route
requestBooksRouter.delete("/request-books/:id", deleteRequestBooksController);


module.exports = requestBooksRouter;