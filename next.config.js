require('dotenv').config()

module.exports = {
    env: {
        OMISE_PUBLIC_KEY: process.env.OMISE_PUBLIC_KEY,
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    }
}