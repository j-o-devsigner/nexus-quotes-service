const getConnection = require('./postgres')
const service = require ('./service')

const list = async (table) => {
        try {
            const connection = await getConnection();
            const result = await connection.query(`SELECT * FROM ${table}`);
            connection.end();
            return result.rows;
        } catch (error) {
            return error.message;
        }
}

const findOne = async (table, id, key) => {
        try {
            const connection = await getConnection();
            const result = await connection.query(`SELECT * FROM ${table} WHERE ${key} ='${id}'`);
            connection.end();
            return result.rows;
        } catch (error) {
            return error.message;
        }
}

const create = async (table, data) => {
        try {
            if(data) {
                const columns = service.setColumns(data)
                let values = service.setValues(data)
                const connection = await getConnection()

                if(table === "quotes_products") {
                    const multipleValues = service.setMultipleValues(data)
                    await connection.query(`INSERT INTO ${table} (${columns.toLowerCase()}) VALUES ${multipleValues}`);
                    return table + ' created!';
                }

                table === "auth" ?
                values = values
                :
                values = values.toLowerCase()

                await connection.query(`INSERT INTO ${table} (${columns.toLowerCase()}) VALUES (${values})`);
                connection.end();
                return table + ' created'
            }
        } catch (error) {
            return error.message;
        }
}

const update = async (table, id, data, key) => {
    try {
        if(id && data) {
            let updates = Object.keys(data).map(value => `"${value}" = '${data[value]}'`).join(', ');
            const connection = await getConnection();
            table === "auth" ?
            updates = updates
            :
            updates = updates.toLowerCase()
            await connection.query(`UPDATE ${table} SET ${updates} WHERE ${key} = ${id}`);
            connection.end();
            return table + ' updated!';
        }
    } catch (error) {
        return error.message;
    }
}

const remove = async (table, id, key) => {
    try{
        if(id) {
            const connection = await getConnection();
            await connection.query(`DELETE FROM ${table} WHERE ${key} = ${id}`);
            return 'Row deleted!';
        }
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    list,
    findOne,
    create,
    update,
    remove,
}