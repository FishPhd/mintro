const SnakeNamingStrategy =
  require("typeorm-naming-strategies").SnakeNamingStrategy;

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: false,
  entities: ["dist/**/*.js"],
  migrations: ["dist/migrations/*.js"],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  migrationsRun: true,
  cli: {
    migrationsDir: "src/migrations",
  },
};
