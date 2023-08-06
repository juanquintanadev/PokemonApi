import * as Joi from "joi";

// aca validamos que esten estas varuables de entorno y esten configuradas
export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),
});