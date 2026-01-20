import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Use a serializable config that Next.js can handle during builds
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", ".vercel/**"],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
