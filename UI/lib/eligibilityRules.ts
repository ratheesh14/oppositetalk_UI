export interface AgeGenderEligibilityResult {
  isEligible: boolean;
  reason?: string;
}

/**
 * STRICT AGE & GENDER ELIGIBILITY RULES:
 * - Male: Must be strictly above 26 years of age (age > 26, i.e., 27+).
 * - Female: Must be strictly above 24 years of age (age > 24, i.e., 25+).
 * - Non-binary / Other: Must be strictly above 24 years of age (age > 24, i.e., 25+).
 */
export function checkStrictAgeGenderEligibility(age: number | string, gender: string): AgeGenderEligibilityResult {
  const cleanGender = (gender || 'Male').trim().toLowerCase();
  const cleanAge = Number(age);

  if (isNaN(cleanAge) || cleanAge <= 0) {
    return {
      isEligible: false,
      reason: 'Please enter a valid age.',
    };
  }

  if (cleanGender === 'male') {
    if (cleanAge <= 26) {
      return {
        isEligible: false,
        reason: `OppositeTalk is exclusively for Males above 26 years of age. A male user aged ${cleanAge} is not eligible.`,
      };
    }
  } else if (cleanGender === 'female') {
    if (cleanAge <= 24) {
      return {
        isEligible: false,
        reason: `OppositeTalk is exclusively for Females above 24 years of age. A female user aged ${cleanAge} is not eligible.`,
      };
    }
  } else {
    if (cleanAge <= 24) {
      return {
        isEligible: false,
        reason: `OppositeTalk is exclusively for users above 24 years of age. An age of ${cleanAge} is not eligible.`,
      };
    }
  }

  return { isEligible: true };
}
