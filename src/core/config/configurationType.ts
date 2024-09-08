// import process from 'process';
import * as process from 'process';
export type ConfigurationType = ReturnType<typeof getSettings>;
const getSettings = () => {
  return {
    apiSettings: {
      PORT: 5001,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN,
    },
    dbSettings: {
      DB_NAME: process.env.DB_NAME,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: parseInt(process.env.DB_PORT!),
      DB_TYPE: process.env.DB_TYPE,
      USERNAME: process.env.DB_USER,
      PASSWORD: process.env.DB_PASSWORD,
    },
  };
};

export default getSettings;
