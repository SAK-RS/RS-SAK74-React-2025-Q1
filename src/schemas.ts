import {
  ALLOWED_COUNTRIES,
  allowedPictureTypes,
  maxPictureSize,
} from 'form_setup';
import { z } from 'zod';

const withDigit = z.string().refine((val) => /^(?=.*\d).+$/g.test(val), {
  message: 'Password must contain at least one digit',
});

const withSpecialChar = z
  .string()
  .refine((val) => /^(?=.*[!@#$%^&*]).+$/g.test(val), {
    message: 'Password must contain at least one special character',
  });

const withUpperCase = z.string().refine((val) => /^(?=.*[A-Z]).+$/g.test(val), {
  message: 'Password must contain at least one uppercase letter',
});

const withLowerCase = z.string().refine((val) => /^(?=.*[a-z]).+$/g.test(val), {
  message: 'Password must contain at least one lowercase letter',
});

const passwordSchema = withDigit
  .and(withSpecialChar)
  .and(withUpperCase)
  .and(withLowerCase);

const fileSchema = z.unknown().refine((file) => file instanceof File, {
  message: 'File must be an instance of File',
});

export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty('Name is required')
      .refine((value) => value.at(0) === value.at(0)?.toUpperCase(), {
        message: 'Name must star with a capital letter',
      }),
    age: z.coerce.number().positive('Age must be a positive number'),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    gender: z.enum(['male', 'female'], {
      invalid_type_error: 'Gender must be selected',
    }),
    accept: z.boolean().refine((value) => value, {
      message: 'You must accept the terms and conditions',
    }),
    picture: z
      .object(
        { length: z.number(), 0: fileSchema },
        { message: 'Picture is required' }
      )
      .or(fileSchema)
      .transform((arg) => (arg instanceof File ? arg : arg[0]))
      .refine(
        (file) => allowedPictureTypes.types.includes(file.type),
        allowedPictureTypes.message
      )
      .refine((file) => file.size < maxPictureSize.size, maxPictureSize.message)
      .transform(async (file) => {
        const { name, size, type } = file;
        const buffer = await file.arrayBuffer();
        const encodedFile = btoa(
          String.fromCharCode(...new Uint8Array(buffer))
        );
        const data = `data:${type};base64,${encodedFile}`;
        return { name, size, type, data };
      }),
    country: z.string().refine(
      (data) => {
        return ALLOWED_COUNTRIES.includes(data);
      },
      { message: 'Invalid Country' }
    ),
  })
  .strict()
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export type FormType = z.infer<typeof formSchema>;
export type FormDataType = Omit<FormType, 'confirmPassword' | 'accept'>;
