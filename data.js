let data = [
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
const getAll = () => {
  //console.log('Rturning the data ', data);
  return {data: true}
}

//should return full data about the requested item(id)
const getQuote = (id) => {
  return data.find(data => data.id == id);
}

const generateRandomId = () => {
  return Math.floor(Math.random() * 100);
}

//should add a new item to the data array, if it doesn't already exist
const addItemQuote = (newRecord) => {
  let nl = data.length;
  if(newRecord.quote !== undefined && newRecord.author !== undefined && newRecord.date !== undefined){
      newRecord.id = generateRandomId();
      data.push(newRecord);
      console.log(newRecord);
      console.log(data);
      console.log('New quote was created');
  }else{
    console.log('New quote submission is invalid');
  }
  return {created: nl !== data.length}
}

// addItemQuote({
// 	quote:"There is no place like home",
// 	author:"Jose Jose",
// 	date: "07/18/2020"
// });

//deleteItem - should delete the requested item
const deleteItemQuote = (record) => {
   let nl = data.length;
   console.log(data.length);
   data = data.filter(item => item.id !== record.id);
   console.log(data.length);
   console.log(data);
   return {deleted: nl !== data.length}
 }
//deleteItemQuote({id: 1});


module.exports = {
  getAll,
  getQuote,
  addItemQuote,
  deleteItemQuote
}