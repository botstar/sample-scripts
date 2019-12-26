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

const parseOrderMessage = (order) => {
  let message = {};
  switch (order[2]) {
    case 'ready': 
      message = {
        title: '🚚Ready to be shipped',
        image: 'https://d1fmnevnt6737i.cloudfront.net/d72e0570-bfdb-11e7-affb-8b31a0f64612/image/1577182059667/Ready%20to%20be%20shipped%20.jpg',
        subtitle: `Package ${order[1]} has been ready to be shipped`
      };
      break;
    case 'pickup': 
      message = {
        title: '🛒Picked up',
        image: 'https://d1fmnevnt6737i.cloudfront.net/d72e0570-bfdb-11e7-affb-8b31a0f64612/image/1577182089875/Picked%20up%20.jpg',
        subtitle: `Package ${order[1]} has been picked up`
      };
      break;
    case 'delivered': 
      message = {
        title: '📦Delivered',
        image: 'https://d1fmnevnt6737i.cloudfront.net/d72e0570-bfdb-11e7-affb-8b31a0f64612/image/1577182259755/Delivered.jpg',
        subtitle: `Package ${order[1]} has been delivered successfully`
      };
      break;
  }

  return {
    "cards": [message]
  };
}

// Main Process: checking order
(async function () {
  const orders = await getSheetData();

  const matchedOrder = orders.find(order => order[1] === event.conversation.variables.order_code);
  const message = parseOrderMessage(matchedOrder);
  
  // More details at https://docs.botstar.com/en/scripting.html#done
  var response = {
    messages: [message]
  };
  done(response); // This is required.
})()
