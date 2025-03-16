import pool from '../db/pool.js';
import { validationResult } from 'express-validator';

export const getAllItemsController = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM games");
        res.render('homepage', {title: 'Rated Games', games: result.rows});
    } catch (error) {
        next(error)
    }
}

export const getEveryoneRatedGamesController = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM games WHERE rating = 'E'");
        res.render('homepage', {title: 'E-Rated Games', games: result.rows});
    } catch (error) {
        next(error)
    }
}

export const getTeenRatedGamesController = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM games WHERE rating = 'T'");
        res.render('homepage', {title: 'T-Rated Games', games: result.rows});
    } catch (error) {
        next(error)
    }
}

export const getMatureRatedGamesController = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM games WHERE rating = 'M'");
        res.render('homepage', {title: 'M-Rated Games', games: result.rows});
    } catch (error) {
        next(error);
    }
}

export const getCreateItemsController = (req, res) => {
    res.render('createpage', {title: 'Add Game'});
}

export const postCreateItemsController = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return next({ status: 400, message: "Validation Error", errors: errors.array() });
        }


        const { vg_name, vg_description, vg_rating, vg_price, vg_stock } = req.body;

        const result = await pool.query(
            'INSERT INTO games (title, description, rating, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [vg_name, vg_description, vg_rating, vg_price, vg_stock]
        );

        res.redirect('/');
    } catch (error) {
        next(error);
    }
}