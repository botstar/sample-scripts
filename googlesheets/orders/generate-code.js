// NOTE: To use this script correctly,
// you need to make sure that the bot have to have a flow variable name `order_code`

const URL = require('url').URL;
const request = require('request');


/**
 * Fetch data from googlesheet
 */
const getSheetData = () => {
  // More details at https://docs.botstar.com/en/scripting.html#event
  
  const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/1wAOx9I55c3cBhK0kesLRQLhokBaetLyO9SP6a7fZut4/values/Track Order Status?key=AIzaSyAcAM3T8cJ4580OD8rOS9DfzTPp0ziyUto`;
  return new Promise(resolve => {
    request(sheetUrl, function (error, response, body) {
      const [_, _1, ...data] = JSON.parse(body || response || {}).values || [];
      resolve(data || []);
    });
  });
};

// Main Process: generate order code
(async function () {
  const orders = await getSheetData();
  
  const randomOrderIndex = Math.floor(Math.random() * orders.length);
  const randomOrder = orders[randomOrderIndex];
  
  // More details at https://docs.botstar.com/en/scripting.html#done
  var response = {
    actions: [
      { 
        type: 'set_variable',
        data: { order_code: randomOrder[1] }
    	}
   	]
  };
  done(response); // This is required.
})()
