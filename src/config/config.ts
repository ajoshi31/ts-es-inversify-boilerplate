import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `env/${env}.env` });

interface EnvironmentVariables {
  [key: string]: string;
}

const config: EnvironmentVariables = Object.entries(process.env).reduce(
  (acc, [key, value]) => {
    return {
      ...acc,
      [key]: value
    };
  },
  {}
);
export default config;
