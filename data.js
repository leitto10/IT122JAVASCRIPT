const data = [
  {
    "id": 1,
    "quote": "We must accept finite disappointment, but we must never lose infinite hope.",
    "author": "Martin Luther King",
    "date": "February 6, 1968"
  },
  {
    "id": 2,
    "quote": "Use what you’ve been through as fuel, believe in yourself and be unstoppable!",
    "author": "Yvonne Pierre",
    "date":"Jan 25, 2013"
  },
  {
    "id": 3,
    "quote": "To succeed, you have to do something and be very bad at it for a while. You have to look bad before you can look really good.",
    "author": "Barbara DeAngelis",
    "date": "Sep 9, 2019"
  },
  {
    "id": 4,
    "quote": "Everything in life is possible if you work hard for it.",
    "author": "Jose L Lopez",
    "date":"June 16, 2020"
  },
  {
    "id": 5,
    "quote": "Live your life as if you were to die tomorrow and learn as if you were to live forever.",
    "author": "Daniel Gil",
    "date": "May 20, 2020"
  }
]

/**
 * Gets all quotes
 * @param None
 */
function getAll(){
  //console.log('Rturning the data ', data);
  return data;
}

/**
 * Gets a specific quote by ID
 * @param {number} id - Accepts the ID of the specified quote.
 */
async function getQuote(id) {
  //const quotes = await getAll();
  return data.find(data => data.id == id);
}



module.exports = {
  getAll,
  getQuote
}