// Generate horizontal list with buttons and their value
var response = {
  messages: [
    {
      "cards": [
        {
          "title": "Product 1",
          "subtitle": "Product 1 subtitle",
          "image": "https://d1fmnevnt6737i.cloudfront.net/default-images/1.png",
          "buttons": [
            {
              "title": "Shop Now",
              // value will be formatted as `varName:value|varName1:value2`
              "value": "price:10|product:Product 1"
            }
          ]
        },
        {
          "title": "Product 2",
          "subtitle": "Product 2 subtitle",
          "image": "https://d1fmnevnt6737i.cloudfront.net/default-images/2.png",
          "buttons": [
            {
              "title": "Shop Now",
              "value": "price:20|product:Product 2"
            }
          ]
        }
      ]
    }
  ]
};

done(response); // This is required.

