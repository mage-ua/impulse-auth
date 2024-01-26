import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

function getMigrationsPath() {
  const migrationDir = 'src/database';

  return path.join(process.cwd(), migrationDir);
}

const basePath = getMigrationsPath();
const migrationPath = path.resolve(basePath, 'migrations');
const configPath = path.resolve(process.cwd(), 'database.json');

module.exports = {
  config: configPath,
  'migrations-path': migrationPath,
  debug: true,
};
