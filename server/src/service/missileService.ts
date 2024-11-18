import DataJson from "../data/missiles.json";
import Missiles, { MissilesModel } from "../models/missileModel";

const createMissile = async (missileData: any): Promise<MissilesModel> => {
  const newMissile = new Missiles({
    name: missileData.name,
    description: missileData.description,
    speed: missileData.speed,
    intercepts: missileData.intercepts,
    price: missileData.price,
  });
  return await newMissile.save();
};

export const insertMissile = async () => {
  for (const element of DataJson) {
    try {
      await createMissile(element);
      console.log("missile created:", element.name);
    } catch (error) {
      console.error("Error creating missile:", error);
    }
  }
};

export const findMissileByName = async (name: string) => {
  return await Missiles.findOne({ name });
}