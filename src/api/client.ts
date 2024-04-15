import { google } from "googleapis"

import dotenv from 'dotenv';

dotenv.config();

const api_key_secret = process.env.YOUTUBE_API_KEY;

const api_version = "v3"
const api_key = api_key_secret

const client = google.youtube({
    version: api_version,
    auth: api_key,
})

export default client
