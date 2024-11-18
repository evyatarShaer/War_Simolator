import { OrganizationModel } from "./organizatiomModel";

export interface UserModel {
  _id: string;
  username: string;
  password: string;
  organization: OrganizationModel;
}
