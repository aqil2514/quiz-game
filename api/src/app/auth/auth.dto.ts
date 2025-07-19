import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export class LoginFormDTO extends createZodDto(loginSchema) {}
