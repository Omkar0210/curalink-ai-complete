export type UserType = "patient" | "researcher";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
  specialization?: string;
  institution?: string;
  orcid?: string;
  researchGate?: string;
}

export interface Favourite {
  id: string;
  type: "expert" | "trial" | "publication";
  itemId: string;
  category: "reading" | "trials" | "collaboration";
  addedAt: Date;
}
