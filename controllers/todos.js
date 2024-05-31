const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const todoModel = require("../models/todos");
const { validationResult } = require("express-validator");
const { response } = require("express");
const mongoose = require("mongoose");
const TodoModel = require("../models/todos");

const createTodo = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(200).json({
      error: true,
      result: result.errors[0],
    });
  }
  try {
    const { DriverId } = req.decodedToken;
    const { todo } = req.body;

    const createdTodo = await todoModel.create({
      todo,
      user_id: DriverId,
    });
    console.log(createdTodo, "createdTodo");
    res.status(200).json({
      message: "Todo created successfully",
      error: false,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message || "Something went wrong in creating todo",
      error: true,
    });
  }
};
const updateTodo = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(200).json({
      error: true,
      result: result.errors[0],
    });
  }
  try {
    const { todo_id } = req.query;
    const { todo } = req.body;

    if (!todo_id) {
      return res
        .status(200)
        .json({ error: true, message: "Invalid Todo ID format" });
    }
    const createdTodo = await todoModel.findByIdAndUpdate(todo_id, {
      todo: todo,
    });
    res.status(200).json({
      message: "Todo created successfully",
      // createdTodo,
      error: false,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message || "Something went wrong in creating todo",
      error: true,
    });
  }
};
const delAll = async () => {
  await TodoModel.deleteMany();
  console.log("delAll");
};
// delAll();
const deleteTodo = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(200).json({
      error: true,
      result: result.errors[0],
    });
  }
  try {
    const { todo_id } = req.query;
    const deleteTodo = await todoModel.findByIdAndDelete({
      _id: todo_id,
    });
    if (deleteTodo) {
      return res.status(200).json({
        message: "Deleted successfully",
        error: false,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: error.message || "Something went wrong in deleting todo",
      error: true,
    });
  }
};
const getAllTodo = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(200).json({
      error: true,
      result: result.errors[0],
    });
  }
  try {
    const { DriverId } = req.decodedToken;
    const allTodo = await todoModel.find({ user_id: DriverId });
    return res.status(200).json({
      allTodo,
      messages: "fetched all todos successfully",
      error: false,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message || "Something went wrong in fetching all todos",
      error: true,
    });
  }
};
// consoletheData();
//
//
module.exports = {
  createTodo,
  deleteTodo,
  updateTodo,
  getAllTodo,
};
