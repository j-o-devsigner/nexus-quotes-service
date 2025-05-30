const createTrans = require('./nodemailer')

const TABLE = 'quotes';

module.exports = function(injectedDB) {

    let database = injectedDB;

    const list = () => {
        return database.list(TABLE);
    };

    const findOne = (id) => {
        if(id) {
            return database.findOne(TABLE, id, "id");
        }
    }

    const create = (data) => {
        if(data.type === 2) {
            const { quoteNumber, discount, idTypeDiscount, discountValue, subtotal, shippingValue, total, sendFrom, sendTo, percentageDiscount } = data.data;
            if(quoteNumber
                && discount === true
                && idTypeDiscount
                && discountValue || discountValue === 0
                && subtotal
                && shippingValue || shippingValue === 0
                && total
                && sendFrom
                && sendTo
                && percentageDiscount || percentageDiscount === 0
                ) {
                    return database.create(TABLE, data.data);
                }
            } else {
                const { quoteNumber, subtotal, shippingValue, total, sendFrom, sendTo } = data.data;
                if(quoteNumber
                    && subtotal
                    && shippingValue || shippingValue === 0
                    && total
                    && sendFrom
                    && sendTo
                ) {
                    return database.create(TABLE, data.data);
        }
    }
}

    const update = (id, data) => {
        if(id && data) {
            const key="quotenumber"
            return database.update(TABLE, id, data, key);
        }
    }

    const remove = (id) => {
        if(id) {
            const key="quotenumber"
            database.remove(TABLE, id, key);
        }
    }

    const sendMail = async (data) => {

        let dataToSend = {...data,
            ["from"]: "Nexus team 🚀<teamnexuscrm@gmail.com>",
            ["subject"]: "Your Quote from Nexus is ready!"
        }

        const transporter = await createTrans();
        const info = await transporter.sendMail(dataToSend)

        return info.body
    }

    return {
        list,
        findOne,
        create,
        update,
        remove,
        sendMail,
    }
}
