const CustomError = require('./customErrors');

module.exports = ({ data, fields }) => {
    let errorMsgs = [];
    let filteredData = Object.keys(fields).reduce((acc, val) => {
      if (!data[val] && fields[val].required)
        errorMsgs.push(`Field ${val} is required`);
    if (data[val]) {
      if(fields[val].type)
        if(fields[val].type === 'array' && Array.isArray(data[val])){
          if(fields[val].arrayOf){
          	if(!data[val].every(value => typeof value === fields[val].arrayOf))
          		errorMsgs.push(`Type of field ${val} must be array of ${fields[val].arrayOf}s`);   
          }
        }
        else if (typeof data[val] !== fields[val].type)
          errorMsgs.push(`Type of field ${val} must be ${fields[val].type}`);
      if(fields[val].length)
        if(String(data[val]).length > fields[val].length)
          errorMsgs.push(`Length of field ${val} must be less then ${fields[val].length}`);
        
      if (data[val]) acc[val] = data[val];
    }
    return acc;
    }, {});
    if(errorMsgs.length)
        throw new CustomError(errorMsgs.join(', '));
    return filteredData;
  }