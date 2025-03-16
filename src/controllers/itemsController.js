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
            const error = new Error("Validation Error");
            error.status = 400;
            error.errors = errors.array();

            return next(error);
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

export const postDeleteItemsController = async (req, res, next) => {
    try {

        const { id } = req.body;
        if (!id) return res.status(400).send('Invalid request');
        
        const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);
        
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}