module.exports.validateCount = (count) => {
    if ( count === undefined ) throw new Error('VALIDATION ERROR: count is not found');
    if ( isNaN(count) ) throw new Error('VALIDATION ERROR: count should be a number');
};

module.exports.validatePrice = (price) => {
    if ( price === undefined ) throw new Error('VALIDATION ERROR: price is not found');
    if ( isNaN(price) ) throw new Error('VALIDATION ERROR: price should be a number');
};

module.exports.validateTitle = (title) => {
    if ( title === undefined ) throw new Error('VALIDATION ERROR: title is not found');
    if ( typeof title !== 'string' ) throw new Error('VALIDATION ERROR: title should be a string');
    if ( title.length > 20 ) throw new Error('VALIDATION ERROR: title is too big (> 20)');
};

module.exports.validateDescription = (description) => {
    if ( description === undefined ) throw new Error('VALIDATION ERROR: description is not found');
    if ( typeof description !== 'string' ) throw new Error('VALIDATION ERROR: description should be a string');
    if ( description.length > 50 ) throw new Error('VALIDATION ERROR: description is too big (> 50)');
};
