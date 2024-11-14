import User, { UserModel } from "../models/userModel";
import { findOrgnizationByName } from "./organizationService";

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

export const reduceResourceAmountService = async (userId: string, resourceId: string): Promise<UserModel | null> => {
  const user = await User.findOneAndUpdate(
    { _id: userId, 'organization.resources._id': resourceId },
    { $inc: { 'organization.resources.$.amount': -1 } }, 
    { new: true } 
  ).populate('organization');

  return user;
};


