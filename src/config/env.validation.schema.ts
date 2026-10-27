import { z } from 'zod';

export const envValidationSchema = z.object({
  APP_NODE: z.enum([
    'development',
    'test',
    'production',
  ]),

  APP_PORT: z.coerce.number().int().positive(),

  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),

  JWT_SECRET: z.string().min(
    32,
    'JWT_SECRET debe tener al menos 32 caracteres',
  ),

  JWT_EXPIRES_IN: z.coerce
    .number()
    .int()
    .positive()
    .default(3600),

  API_KEYS: z.string().min(
    1,
    'Debes configurar al menos una API Key',
  ),

  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_NAME: z.string().min(1),
});

export const validateEnv = (
  config: Record<string, unknown>,
) => {
  const result = envValidationSchema.safeParse(config);

  if (!result.success) {
    const details = result.error.issues
      .map(
        (issue) =>
          `- ${issue.path.join('.')}: ${issue.message}`,
      )
      .join('\n');

    throw new Error(
      `Variables de entorno inválidas:\n${details}`,
    );
  }

  return result.data;
};