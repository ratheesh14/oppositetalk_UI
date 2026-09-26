import { z } from 'zod';

export const profileBasicSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old').max(100, 'Invalid age'),
  gender: z.string().min(1, 'Please select your gender'),
  location: z.string().min(2, 'Please enter your current location'),
  bio: z.string().min(20, 'Bio should be at least 20 characters').max(1000, 'Bio too long'),
});

export const profileEducationSchema = z.object({
  degreeLevel: z.string().min(1, 'Degree level is required'),
  fieldOfStudy: z.string().min(2, 'Field of study is required'),
  institution: z.string().optional(),
});

export const profileProfessionSchema = z.object({
  title: z.string().min(2, 'Job title is required'),
  industry: z.string().min(2, 'Industry is required'),
  company: z.string().optional(),
  workStyle: z.string().min(1, 'Please select work style'),
});

export const profileGoalsSchema = z.object({
  timelineToMarriage: z.string().min(1, 'Timeline selection is required'),
  relationshipType: z.string().min(1, 'Relationship type selection is required'),
  primaryValues: z.array(z.string()).min(1, 'Select at least 1 primary value'),
});

export const profileFamilySchema = z.object({
  wantsChildren: z.string().min(1, 'Please select children preference'),
  currentChildrenCount: z.number().min(0, 'Cannot be negative'),
  familyValuesDescription: z.string().min(10, 'Please describe your family vision'),
});

export const profileFinancialSchema = z.object({
  financialStyle: z.string().min(1, 'Select financial style'),
  budgetingApproach: z.string().min(1, 'Select budgeting approach'),
  homeOwnershipGoal: z.string().min(1, 'Select home ownership goal'),
});
