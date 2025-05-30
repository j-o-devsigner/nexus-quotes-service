const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const config = require('../../config')

async function createTrans() {

    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: config.sendgrid_key
        })
    )

    return transport;
}

module.exports = createTrans;