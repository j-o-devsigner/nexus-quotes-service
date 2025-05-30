
const organizeQuoteData = (data) => {
    const {
        quoteNumber,
        discount,
        idTypeDiscount,
        discountValue,
        subtotal,
        shippingValue,
        total,
        sendFrom,
        sendTo,
        percentageDiscount
    } = data;

    let dataQuote = {};

    !discount ?
    dataQuote = { "type": 1, "data": { quoteNumber, subtotal, shippingValue, total, sendFrom, sendTo }}
    : dataQuote = { "type": 2, "data": { quoteNumber, discount, idTypeDiscount, discountValue, subtotal, shippingValue, total, sendFrom, sendTo, percentageDiscount }}

    return dataQuote;
}

const groupData = async (list, products) => {
    try{
        const updatedData = await list.map(quote => {
            const quoteProducts = products.filter(product => product.idquote === quote.id);
            return { ...quote, products: quoteProducts };
        });
        return updatedData;
    } catch(error) {
        return message.error
    }
}

const findOne = async (id, data) => {
    return data.filter(quote => quote.quotenumber === id);
}

const findProducts = async (detailProducts, products) => {
    try {
        let data = []
            products.map( product => {
                detailProducts.map(detail => {
                    if(detail.id === product.idproduct) {
                    data.push(detail)
                }
            })
        })
        return data
    } catch(error) {
        return message.error
    }
}

const methods = {
    organizeQuoteData,
    groupData,
    findOne,
    findProducts,
}

module.exports = methods