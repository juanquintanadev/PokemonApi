
// mapeamos las variables de entorno a un objeto de nuestra configuracion de variables de entorno
// una simple funcion que anda flotando por la app y nosotros tenemos que decirle a nest que use este archivo para cargar la configuracion de variables
export const EnvConfiguration = () => ({

    // devolvemos un objeto donde nos va adecir en que monento estamos
    enviroment: process.env.NODE_ENV || 'dev', // production, development or testing
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,
})