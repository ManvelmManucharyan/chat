require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

class Auth {
    static async hash(password) {
        return await bcrypt.hash(password, 12);
    }

    static async compare(newPassword, userPassword) {
        return await bcrypt.compare(newPassword, userPassword);
    }
    
    static jwtSign(user) {
        const authToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1y" });
        return { authToken };
    }

    static async authenticateToken(req, res, next) {
        let authToken = req.cookies.token;
        req.headers["authorization"] = `Bearer ${authToken}`;
        if(!authToken || authToken === "undefined") return res.status(403).send("Please login");
        let user, error;
        jwt.verify(authToken, process.env.JWT_SECRET, (err, u) => {
            if(err) {error = err.name;}
            else {user = u;}
        });
        if(error) {
            error = undefined;
            authToken = req.cookies.refreshToken;
            jwt.verify(authToken, process.env.JWT_SECRET, (err, u) => {
                if(err) {error = err.name;}
                else {user = u;}
            });
            if(error) {
                return res.status(400).send("Token Expired");
            }
            const result = JWT.jwtSign(user);
            res.cookie("token", result.authToken);
            res.cookie("refreshToken", result.refreshToken);
            req.user = user;
            next();
        } else {
            const result = JWT.jwtSign(user);
            res.cookie("token", result.authToken);
            res.cookie("refreshToken", result.refreshToken);
            req.user = user;
            next();
        }
    }
}

module.exports = Auth;