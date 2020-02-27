// Extract and save data to variables
const latestResponse = event.conversation.userResponses.latest_response;
// extract data from latest response, which is formatted: `varName:value|varName1:value1`
const data = latestResponse
  .split('|') // every value will be separated as an array of `varName:value`
  .map(v => v.split(':')) // value will be an array of [varName, value] 
  .reduce(
    (result, [varName, value]) => Object.assign(result, { [varName]: value }),
    {}
  );
// Output will be: data = { varName: "value", varName1: "value1" }

const response = {
  actions: [
    {
      type: 'set_variable',
      data: data
    }
  ]
};

done(response);

