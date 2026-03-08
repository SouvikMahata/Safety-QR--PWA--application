// src/validations/schemas.js
// All Zod schemas — used with react-hook-form via @hookform/resolvers/zod
import { z } from 'zod';
import { isValidPhone } from '@utils/formatters';
import { BLOOD_GROUPS, ENV } from '@utils';

// ── Reusable field rules ─────────────────────────────

const phoneField = (label = 'Mobile number') =>
  z
    .string({ required_error: `${label} is required` })
    .min(1, `${label} is required`)
    .refine((v) => isValidPhone(v, 'IN'), `Enter a valid ${label.toLowerCase()}`);

// ── Auth schemas ─────────────────────────────────────

/** Step 1 — enter mobile */
export const mobileSchema = z.object({
  mobile: phoneField('Mobile number'),
});

/** Step 2 — enter OTP */
export const otpSchema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(1, 'OTP is required')
    .regex(/^\d+$/, 'OTP must be numeric only')
    .length(ENV.OTP_LENGTH, `OTP must be ${ENV.OTP_LENGTH} digits`),
});

/** Registration — mobile + nonce + card_number */
export const registrationSchema = z.object({
  mobile: phoneField(),
  nonce: z
    .string({ required_error: 'Nonce is required' })
    .min(6, 'Invalid nonce — check your card'),
  card_number: z
    .string({ required_error: 'Card number is required' })
    .min(8, 'Card number must be at least 8 characters')
    .regex(/^[A-Z0-9-]+$/i, 'Card number contains invalid characters'),
});

// ── Emergency contact sub-schema ─────────────────────

const emergencyContactSchema = z.object({
  name: z
    .string({ required_error: 'Contact name is required' })
    .min(2, 'Name is too short'),
  relation: z
    .string({ required_error: 'Relation is required' })
    .min(1, 'Relation is required'),
  mobile: phoneField('Contact mobile'),
});

// ── Student profile schema ───────────────────────────

export const studentProfileSchema = z.object({
  name: z
    .string({ required_error: 'Student name is required' })
    .min(2, 'Name must be at least 2 characters'),
  dob: z
    .string({ required_error: 'Date of birth is required' })
    .min(1, 'Date of birth is required')
    .refine((v) => {
      const d = new Date(v);
      return !isNaN(d.getTime()) && d < new Date();
    }, 'Enter a valid date of birth'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Select a valid gender',
  }),
  blood_group: z.enum(BLOOD_GROUPS, {
    required_error: 'Blood group is required',
    invalid_type_error: 'Select a valid blood group',
  }),
  school_name: z
    .string({ required_error: 'School name is required' })
    .min(2, 'School name is too short'),
  class: z
    .string({ required_error: 'Class is required' })
    .min(1, 'Class is required'),
  allergies: z.string().optional().default(''),
  medical_conditions: z.string().optional().default(''),
  emergency_contacts: z
    .array(emergencyContactSchema)
    .min(1, 'Add at least one emergency contact')
    .max(5, 'Maximum 5 emergency contacts allowed'),
});

// ── Parent profile schema ────────────────────────────

export const parentProfileSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name is too short'),
  email: z
    .string()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),
  address: z.string().optional().default(''),
});

// ── Link card schema ─────────────────────────────────

export const linkCardSchema = z.object({
  card_number: z
    .string({ required_error: 'Card number is required' })
    .min(8, 'Card number must be at least 8 characters')
    .regex(/^[A-Z0-9-]+$/i, 'Invalid characters in card number'),
  nonce: z
    .string({ required_error: 'Nonce is required' })
    .min(6, 'Invalid nonce'),
  student_id: z
    .string({ required_error: 'Please select a student' })
    .min(1, 'Please select a student'),
});

// ── Inferred types (JSDoc-friendly) ─────────────────
/**
 * @typedef {z.infer<typeof mobileSchema>}         MobileForm
 * @typedef {z.infer<typeof otpSchema>}            OtpForm
 * @typedef {z.infer<typeof registrationSchema>}   RegistrationForm
 * @typedef {z.infer<typeof studentProfileSchema>} StudentProfileForm
 * @typedef {z.infer<typeof parentProfileSchema>}  ParentProfileForm
 * @typedef {z.infer<typeof linkCardSchema>}       LinkCardForm
 */