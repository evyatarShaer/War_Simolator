import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { OrganizationModel, organizationSchema } from "./organizationModel";

export interface UserModel extends Document {
  username: string;
  password: string;
  organization: OrganizationModel;
  comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserModel>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organization: { type: organizationSchema, required: true}
  },
  { timestamps: true }
);

userSchema.pre<UserModel>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<UserModel>("User", userSchema);
