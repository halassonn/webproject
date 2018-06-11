const request = require('request');

module.exports = {
    validCaptcha: () => {
        return (req, res, next) => {
            console.log(req.body.captcha)
            if (
                req.body.captcha === undefined ||
                req.body.captcha === '' ||
                req.body.captcha === null) {
                return res.status(400).json({
                    success: false,
                    message: "Please select captcha first"
                });
            }
            const secretKey = "6LdX8F0UAAAAAIWtYHY6v4U_4cttGjIXi7WZtSEP";
            const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

            const re = request(verificationURL, (error, response, body) => {
                body = JSON.parse(body);
                if (body.success !== undefined && !body.success) {
                    return res.json({
                        success: false,
                    });
                }
            });
            next();

        }

    }

}