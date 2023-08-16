import express from 'express';
import bcrypt from 'bcrypt';
import customerModel from '../models/customerModel.js';

export const register = async (req, res, next) => {
    const { customerName, email, password } = req.body;
    try {
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, async (err, salt) => {
            if (err) {
                return next(err);
            }

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return next(err);
                }

                const customer = new customerModel({
                    customerName: customerName,
                    email: email,
                    password: hash
                });

                try {
                    const result = await customer.save();
                    res.status(201).json({
                        success: true,
                        message: `The customer ${result.customerName} has been created`
                    });
                } catch (saveErr) {
                    next(saveErr);
                }
            });
        });
    } catch (err) {
        next(err);
    }
};