import envConf from 'dotenv';
import path from 'path';

envConf.config({
    path: path.join(process.cwd(), '.env'),
});

export const env = {
    PORT: process.env.PORT,
    db_url_local: process.env.DB_URL_LOCAL,
    db_url_prod: process.env.DB_URL_PROD,
    node_env: process.env.NODE_ENV,
    get db_url(){
        return this.node_env === 'production' 
        ? this.db_url_prod
        : this.db_url_local
    }
}