interface MissileModel {
  name: string;
  amount: number;
}

export interface OrganizationModel {
  name: string;
  resources: MissileModel[];
  budget: number;
}
