import pool from '../db/pool.js';

export const getAllItemsController = (req, res) => {
    res.render('homepage', {title: 'Rated Games'});
}

export const getCreateItemsController = (req, res) => {
    res.render('createpage', {title: 'Add Game'});
}

export const postCreateItemsController = async (req, res) => {
    try {
        const { vg_name, vg_description, vg_rating, vg_price, vg_stock } = req.body;

        const result = await pool.query(
            'INSERT INTO '
        )
    }
}