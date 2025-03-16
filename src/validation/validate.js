import { body } from 'express-validator';

const validateUser = [
    body("title").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("rating").trim().notEmpty().isIn(["E", "T", "M"]),
    body("price").notEmpty().isNumeric(),
    body("stock").notEmpty().isNumeric()
]

export default validateUser;