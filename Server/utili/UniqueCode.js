function generateUniqueCode(length) {
    return (Math.random().toString().slice(2,10)+Math.random().toString().slice(2,10)).slice(4, 4+length);
  }


module.exports = generateUniqueCode;