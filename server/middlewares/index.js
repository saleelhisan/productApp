import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {

    try {

        let token = req.header("Authorization");
        console.log(token, 'token');

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
        console.log('successull');
    } catch (err) {
        console.log('error in verifying');
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};