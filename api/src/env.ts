import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().min(1),
  MONGO_URL: z.string().min(1),

  CLIENT_ID: z.string().min(1),
  CLIENT_SECRET: z.string().min(1),
  REDIRECT_URI: z.string().min(1),

  JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
