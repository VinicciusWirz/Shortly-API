export default function schemaValidation(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const logs = validation.error.details.map((d) => d.message);
      return res.status(422).send(logs);
    }
    next();
  };
}
