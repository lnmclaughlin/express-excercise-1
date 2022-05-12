import express from "express";
import Shop from "../models/Shop";
import { shops } from "./ShopDatabase";

export const ShopFinder = express.Router();

ShopFinder.get("/shops", (req, res) => {
  const { allShops, minRating } = req.query;
  let filteredArray: Shop[] = shops;

  if (minRating) {
    filteredArray = filteredArray.filter((item) => {
      return item.rating >= +minRating;
    });
  }
  res.status(200).json(filteredArray);

  if (allShops) {
    filteredArray = filteredArray.filter((item) => {
      return item.name;
    });
  }
  res.status(200).json(filteredArray);
});

ShopFinder.get("/shops/:id", (req, res) => {
  const id: number = +req.params.id;

  const itemID: Shop | undefined = shops.find((item) => {
    return item.id === id;
  });

  if (itemID) {
    res.status(200).json(itemID);
  } else {
    res.status(404).json({ error: ` Shop not found: ${id}` });
  }
});
