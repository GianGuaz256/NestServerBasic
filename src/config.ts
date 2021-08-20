require('dotenv').config();

export default {
    db: process.env.DB,
    node_env: process.env.NODE_ENV || 'development',
    server_port: process.env.SERVER_PORT || '9000',
    
}