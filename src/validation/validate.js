import { body } from 'express-validator';

const validateUser = [
    body("vg_name").trim().notEmpty(),
    body("vg_description").trim().notEmpty(),
    body("vg_rating").trim().notEmpty().isIn(["E", "T", "M"]),
    body("vg_price").notEmpty().isNumeric(),
    body("vg_stock").notEmpty().isNumeric()
]

export default validateUser;