import mongoose, { Schema, Document } from "mongoose";

interface MissileModel {
  _id: string;
  name: string;
  amount: number;
}

export interface OrganizationModel extends Document {
  name: string;
  resources: MissileModel[];
  budget: number;
}

export const organizationSchema = new Schema<OrganizationModel>(
  {
    name: {
      type: String,
      required: true,
    },
    resources: [
      {
        name: String,
        amount: Number,
      },
    ],
    budget: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

organizationSchema.index({ name: 1 }, { unique: false });
export default mongoose.model<OrganizationModel>("Organization", organizationSchema);
