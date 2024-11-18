export interface MissileModel {
  _id: string;
  name: string;
  amount: number;
}

export interface OrganizationModel {
  name: string;
  resources: MissileModel[];
  budget: number;
}
