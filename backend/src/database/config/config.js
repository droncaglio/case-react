const config = {
  "development": {
      "username": "postgres",
      "password": "password",
      "database": "case_react_node",
      "host": "localhost",
      "dialect": 'postgres'
  },
  "test": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": 'postgres'
  },
  "production": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": 'postgres'
  }
};
export default config;