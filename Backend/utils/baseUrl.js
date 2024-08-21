const getBaseUrl = (req) => {
    const protocol = req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}`;
  };



  module.exports = getBaseUrl;
