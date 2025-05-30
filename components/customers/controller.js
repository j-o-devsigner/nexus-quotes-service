
const TABLE = 'customers';

module.exports = function(injectedDB) {

    let database = injectedDB;

    const list = () => {
        return database.list(TABLE);
    };

    const findCustomer = (id) => {
            return database.findOne(TABLE, id, "id");
    }

    const findUser = (id) => {
            return database.findOne("users", id, "id");
    }

    return {
        list,
        findCustomer,
        findUser,
    }
}
