import Organization, { OrganizationModel } from "../models/organizationModel";
import DataJson from "../data/organizations.json";

const createOrganization = async (organizationData: any): Promise<OrganizationModel> => {
  const newOrganization = new Organization({
    name: organizationData.name,
    resources: organizationData.resources,
    budget: organizationData.budget,
  });
  return await newOrganization.save();
};

export const insertOrganizations = async () => {
  for (const element of DataJson) {
    try {
      await createOrganization(element);
      console.log("Organization created:", element.name);
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  }
};


export const findOrgnizationByName = async (name: string): Promise<OrganizationModel | null> => {
  const organ = await Organization.findOne({ name }).select('-_id');
  return organ;
};
