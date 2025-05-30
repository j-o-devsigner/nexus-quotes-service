
const TABLE = 'quotes_products';

module.exports = function(injectedDB) {

    let database = injectedDB;

    const list = () => {
        return database.list(TABLE);
    };

    const create = (id, data, action) => {
        let validator = true;

        const actions = {
            "create": "(SELECT MAX(id) FROM quotes)",
            "update": `(SELECT id FROM quotes WHERE quotenumber =${id})`
        }

        data.map(product => {
            product.idQuote = actions[action];
            for (const value of Object.values(product)) {
                if(!value) {
                    validator = false;
                    break;
                }
            }
        })

        if(validator === true) {
            database.create(TABLE, data);
        } else {
            database.remove("quotes", "(SELECT MAX(id) FROM quotes)", "id")
        }
    }

    const remove = (id) => {
        if(id) {
            const select = `(SELECT id FROM quotes WHERE quotenumber =${id})`;
            const key = "idquote"
            return database.remove(TABLE, select, key);
        }
    }

    return {
        list,
        create,
        remove,
    }
}
