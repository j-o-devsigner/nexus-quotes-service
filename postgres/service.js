
const setColumns = (data) => {
    if(typeof(data.length) === "number") {
        return Object.keys(data[0]).join(',');
    }
    return Object.keys(data).join(',');
}

const setValues = (data) => {
    return Object.values(data).map( v => `'${v}'`).join(', ');
}

const setMultipleValues = (data) => {

    let setValues = '';
    data.map( value => {
        const values = Object.values(value).map( v => `${v}`).join(', ');
        setValues += `(${values}),`;
    })
    setValues = setValues.slice(0, -1);
    return setValues;
}


const methods = {
    setColumns,
    setValues,
    setMultipleValues,
}

module.exports = methods