import joi from "joi";

export const refreshTokenBodyValidation = (body) => {
  const schema = joi.object({
    refreshToken: joi.string().required().label("Refresh Token"),
  });
  return schema.validate(body);
};
