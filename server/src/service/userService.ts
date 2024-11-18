import User, { UserModel } from "../models/userModel";
import { findOrgnizationByName } from "./organizationService";
import { MissilesToIntercept } from '../utils/launchAndIntercept';
import { findMissileByName } from "./missileService";

export const createUserService = async ( name: string, password: string, organization: string): Promise<UserModel> => {
  const user = new User({
    username: name,
    password: password,
    organization: await findOrgnizationByName(organization),
  });
  await user.save();
  return user;
};

export const getUserByNameService = async (name: string): Promise<UserModel | null> => {
  const user = await User.findOne({ username: name }).select("-password")
    .populate("organization");
  return user;
};

export const reduceResourceAmountService = async (userId: string, resourceId: string): Promise<UserModel | string[] | null> => {
  const user = await User.findOneAndUpdate(
    { _id: userId, 'organization.resources._id': resourceId },
    { $inc: { 'organization.resources.$.amount': -1 } }, 
    { new: true } 
  ).populate('organization');

  // if (user?.organization.name === 'Hezbollah' || user?.organization.name === 'Hamas' 
  //   || user?.organization.name === 'IRGC' || user?.organization.name === 'Houthis') 
  //   {
  //     const resource = user.organization.resources.find(r => r._id.toString() === resourceId);
  //     // פונקציה שמקבלת את השם של הטיל התוקף ואת שם הנתקף ומחזירה את 
  //     // מערך טילי ההגנה של הנתקף
  //     const list = await MissilesToIntercept(resource?.name, )
  //     if (!list) return [];
  //     return list;
  //   }
  return user;
};
