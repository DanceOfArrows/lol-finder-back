const bearerToken = require("express-bearer-token");
const jwt = require("jsonwebtoken");

const { jwtConfig } = require("./config");
const { UserInfo } = require("./db/models");

const { secret, expiresIn } = jwtConfig;

const getToken = user => {
    const userData = {
        id: user.id,
        email: user.email,
    };

    const token = jwt.sign(
        { data: userData },
        secret,
        { expiresIn: parseInt(expiresIn, 10) }
    );
    return token;
};

const restoreUser = (req, res, next) => {

    const { token } = req;
    if (!token) {
        return next();
    }

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            err.status = 401;
            return next(err);
        }

        const { id } = jwtPayload.data;

        try {
            req.user = await UserInfo.findByPk(id);
        } catch (e) {
            return next(e);
        }

        if (!req.user) {
            return res.set("WWW-Authenticate", "Bearer")
                .status(401)
                .end();
        }

        return next();
    });
};

const requireAuth = [bearerToken(), restoreUser];

module.exports = { getToken, requireAuth };