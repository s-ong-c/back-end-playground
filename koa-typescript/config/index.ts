export class Config {
    public static readonly development = {
        username: 'postgres',
        password: 'postgres',
        database: 'testdb',
        host: '127.0.0.1',
        port: 5433,
        dialect: 'postgres',
        logging: true,
        force: true,
        timezone: '+00:00'
    };

    public static readonly test = {
        username: 'postgres',
        password: 'postgres',
        database: 'testdb',
        host: '127.0.0.1',
        port: 5433,
        dialect: 'postgres',
        logging: true,
        force: true,
        timezone: '+00:00'
    };

    public static readonly production = {
        username: 'postgres',
        password: 'postgres',
        database: 'testdb',
        host: '127.0.0.1',
        port: 5433,
        dialect: 'postgres',
        logging: true,
        force: true,
        timezone: '+00:00'
    };
}
