export interface IConfig {
  port: number;
  db: IDatebaseConfig;
  jwt: IJwtConfig;
}

export interface IDatebaseConfig {
  host: string;
  port: number;
  name: string;
}

export interface IJwtConfig {
  secret: string;
}

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
