import { config } from 'dotenv';
import { EnvironmentPlugin } from 'webpack';
config();

module.exports = {
    plugins: [
        new EnvironmentPlugin([
            'API_BASE_URL',
            'GOOGLE_CLIENT_ID'
        ])
    ]
}
