import { AssessmentAnswerSubmission, AssessmentResult, AssessmentVersionInfo } from '@/types/eligibility';
import { apiRequest } from '@/lib/apiClient';

const MOCK_QUESTIONS: AssessmentVersionInfo = {
  versionId: 'v2.4-stable',
  updatedAt: '2026-09-01T00:00:00Z',
  sections: [
    'Basic eligibility',
    'Relationship intentions',
    'Family goals',
    'Financial responsibility',
    'Personal development',
    'Lifestyle',
    'Social awareness',
  ],
  questions: [
    {
      id: 'q1',
      section: 'Basic eligibility',
      questionText: 'Are you at least 18 years of age and legally eligible to enter into marriage/civil partnerships?',
      description: 'The platform is exclusively for consenting adults seeking long-term serious commitments.',
      isMandatory: true,
      options: [
        { id: 'q1_a1', text: 'Yes, I am an adult seeking serious relationship commitments' },
        { id: 'q1_a2', text: 'No, I am under 18 years of age', isMandatoryDisqualifier: true },
      ],
    },
    {
      id: 'q2',
      section: 'Relationship intentions',
      questionText: 'Are you currently looking for a serious relationship that may lead to marriage or long-term family building?',
      description: 'OppositeTalk focuses on long-term values rather than casual dating.',
      isMandatory: true,
      options: [
        { id: 'q2_a1', text: 'Yes, I am seeking a partner for marriage and long-term family life' },
        { id: 'q2_a2', text: 'Yes, open to long-term serious relationship' },
        { id: 'q2_a3', text: 'No, I am only interested in casual hookups or non-committed dating', isMandatoryDisqualifier: true },
      ],
    },
    {
      id: 'q3',
      section: 'Family goals',
      questionText: 'What is your perspective on family building and shared household responsibilities?',
      description: 'Alignment on children and household commitment creates lasting foundations.',
      isMandatory: false,
      options: [
        { id: 'q3_a1', text: 'Eager to build a family with mutual dedication and support' },
        { id: 'q3_a2', text: 'Open to children and prioritizing a stable home environment' },
        { id: 'q3_a3', text: 'Focused on partnership first, open to discussions' },
      ],
    },
    {
      id: 'q4',
      section: 'Financial responsibility',
      questionText: 'How do you approach financial management and long-term economic planning?',
      isMandatory: false,
      options: [
        { id: 'q4_a1', text: 'Proactive saver, value financial responsibility and budgeting' },
        { id: 'q4_a2', text: 'Balanced approach to saving and spending' },
        { id: 'q4_a3', text: 'Focus on growth and investment for family security' },
      ],
    },
    {
      id: 'q5',
      section: 'Personal development',
      questionText: 'How important is continuous self-improvement, communication, and emotional maturity to you?',
      isMandatory: false,
      options: [
        { id: 'q5_a1', text: 'Essential — I actively invest in self-growth and open communication' },
        { id: 'q5_a2', text: 'Important — I value honest feedback and growth with a partner' },
      ],
    },
    {
      id: 'q6',
      section: 'Lifestyle',
      questionText: 'Do you value maintaining a healthy, constructive lifestyle and respectful community interactions?',
      isMandatory: true,
      options: [
        { id: 'q6_a1', text: 'Yes, I value mutual respect, health, and constructive communication' },
        { id: 'q6_a2', text: 'No', isMandatoryDisqualifier: true },
      ],
    },
    {
      id: 'q7',
      section: 'Social awareness',
      questionText: 'Do you agree to treat all members with respect, dignity, and personal accountability?',
      isMandatory: true,
      options: [
        { id: 'q7_a1', text: 'Yes, I commit to respectful, honest, and dignified interactions' },
        { id: 'q7_a2', text: 'No', isMandatoryDisqualifier: true },
      ],
    },
  ],
};

export const eligibilityService = {
  async getAssessmentQuestions(): Promise<AssessmentVersionInfo> {
    try {
      return await apiRequest<AssessmentVersionInfo>('/eligibility/questions');
    } catch {
      return MOCK_QUESTIONS;
    }
  },

  async submitAssessment(answers: Record<string, string>): Promise<AssessmentResult> {
    try {
      return await apiRequest<AssessmentResult>('/eligibility/assess', {
        method: 'POST',
        body: JSON.stringify({ answers }),
      });
    } catch {
      // Backend simulation logic
      const isDisqualified = Object.entries(answers).some(([qId, oId]) => {
        const question = MOCK_QUESTIONS.questions.find((q) => q.id === qId);
        const option = question?.options.find((o) => o.id === oId);
        return option?.isMandatoryDisqualifier;
      });

      if (isDisqualified) {
        return {
          isEligible: false,
          status: 'NotEligible',
          reasons: [
            'Responses indicate relationship intentions outside the core platform criteria for serious long-term commitments and family goals.',
          ],
          evaluatedAt: new Date().toISOString(),
          assessmentVersion: MOCK_QUESTIONS.versionId,
        };
      }

      return {
        isEligible: true,
        status: 'Eligible',
        evaluatedAt: new Date().toISOString(),
        assessmentVersion: MOCK_QUESTIONS.versionId,
      };
    }
  },
};
