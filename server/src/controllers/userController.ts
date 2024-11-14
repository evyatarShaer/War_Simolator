import { Request, Response, NextFunction } from "express";
import { getUserByNameService, reduceResourceAmountService } from "../service/userService";

export const getUserByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const user = await getUserByNameService(name);
    if (!user) {
      res.status(404).json({ message: "משתמש לא נמצא" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "תקלה בהבאת משתמש" });
  }
};

export const reduceResourceAmount = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { resourceId } = req.body; 
    const user = await reduceResourceAmountService(userId, resourceId);
    if (!user) {
      res.status(404).json({ message: "משתמש לא נמצא" });
      return;
    }
    res.json(user);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "תקלה בהורדת משאבים" });
  }
};
