const express = require('express');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const { postRegisterUser, postLoginUser, patchMe, getMe, deleteMe } = require('./_controllers');

const router = express.Router();

router.post('/users/register', postRegisterUser);
router.post('/users/login', postLoginUser);
router.get('/users/me', isLoggedIn, getMe);
router.patch('/users/me', isLoggedIn, patchMe);
router.delete('/users/me', isLoggedIn, deleteMe);

module.exports = router;
