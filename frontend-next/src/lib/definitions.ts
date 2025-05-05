import { z } from "zod";

export const SignupFormSchema = z.object({
  name: 
    z.string()
    .min(2,{message:'Name must be at least 2 characters long'})
    .trim(),
  password: 
    z.string()
    .min(4,{message:'Password must be at least 4 characters long'})
    .trim(),
  
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined


