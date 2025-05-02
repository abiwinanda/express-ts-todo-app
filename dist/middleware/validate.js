"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json(result.error.format());
        return;
    }
    next();
};
exports.validate = validate;
