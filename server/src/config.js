import fs from 'fs';
import path from 'path';
const env = process.env.NODE_ENV || 'development';
const fileName = path.join(__dirname, `/configs/config.${env}.json`);
const config = JSON.parse(fs.readFileSync(fileName, 'utf8'));

// augmentation of the configuration that will
// be passed using environment variables
config.common.dns = process.env.URI || 'http://localhost:8080';
config.session.mongo.uri = process.env.MONGO_URI || 'mongodb://localhost:32780/auth';
config.session.mongo.collection = process.env.MONGO_SESSIONS || 'sessions';

export default config;
