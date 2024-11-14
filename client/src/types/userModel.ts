import { OrganizationModel } from "./organizatiomModel";

export interface UserModel {
  username: string;
  password: string;
  organization: OrganizationModel;
}
