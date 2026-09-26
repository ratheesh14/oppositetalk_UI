export type EligibilitySectionName =
  | 'Basic eligibility'
  | 'Relationship intentions'
  | 'Family goals'
  | 'Financial responsibility'
  | 'Personal development'
  | 'Lifestyle'
  | 'Social awareness';

export interface EligibilityOption {
  id: string;
  text: string;
  subtext?: string;
  isMandatoryDisqualifier?: boolean;
}

export interface EligibilityQuestion {
  id: string;
  section: EligibilitySectionName;
  questionText: string;
  description?: string;
  options: EligibilityOption[];
  isMandatory: boolean;
}

export interface AssessmentVersionInfo {
  versionId: string;
  updatedAt: string;
  sections: EligibilitySectionName[];
  questions: EligibilityQuestion[];
}

export interface AssessmentAnswerSubmission {
  questionId: string;
  optionId: string;
}

export interface AssessmentResult {
  isEligible: boolean;
  status: 'Eligible' | 'NotEligible';
  reasons?: string[];
  evaluatedAt: string;
  assessmentVersion: string;
}
