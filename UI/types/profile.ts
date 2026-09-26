export interface ProfileBasicInfo {
  displayName: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
}

export interface ProfileEducation {
  degreeLevel: string;
  fieldOfStudy: string;
  institution?: string;
}

export interface ProfileProfession {
  title: string;
  industry: string;
  company?: string;
  workStyle: string;
}

export interface ProfileLocation {
  city: string;
  country: string;
  openToRelocation: boolean;
}

export interface ProfileLifestyle {
  smokingPreference: string;
  drinkingPreference: string;
  dietaryPreference: string;
  fitnessRoutine: string;
}

export interface ProfileRelationshipGoals {
  timelineToMarriage: string;
  relationshipType: string;
  primaryValues: string[];
}

export interface ProfileFamilyGoals {
  wantsChildren: string;
  currentChildrenCount: number;
  familyValuesDescription: string;
}

export interface ProfileFinancialPreferences {
  financialStyle: string;
  budgetingApproach: string;
  homeOwnershipGoal: string;
}

export interface ProfileTravelPreferences {
  frequency: string;
  style: string;
  favoriteDestinations: string[];
}

export interface ProfileInterests {
  hobbies: string[];
  favoriteTopics: string[];
}

export interface ProfilePhoto {
  id: string;
  url: string;
  isMain: boolean;
  caption?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  isVerified: boolean;
  verificationBadge: string;
  completionPercentage: number;
  basicInfo: ProfileBasicInfo;
  education: ProfileEducation;
  profession: ProfileProfession;
  location: ProfileLocation;
  lifestyle: ProfileLifestyle;
  relationshipGoals: ProfileRelationshipGoals;
  familyGoals: ProfileFamilyGoals;
  financialPreferences: ProfileFinancialPreferences;
  travelPreferences: ProfileTravelPreferences;
  interests: ProfileInterests;
  photos: ProfilePhoto[];
  updatedAt: string;
}
