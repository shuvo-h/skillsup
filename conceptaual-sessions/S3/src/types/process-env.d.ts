declare namespace NodeJS{
    export type ProcessEnv = {
        PORT: number,
        DB_URL_LOCAL: string,
        DB_URL_PROD: string,
        NODE_ENV: string,
    }
}