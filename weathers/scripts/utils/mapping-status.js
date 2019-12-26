// OpenWeatherMap weather ids
const weathers = `200	Thunderstorm	thunderstorm with light rain	 11d
201	Thunderstorm	thunderstorm with rain	 11d
202	Thunderstorm	thunderstorm with heavy rain	 11d
210	Thunderstorm	light thunderstorm	 11d
211	Thunderstorm	thunderstorm	 11d
212	Thunderstorm	heavy thunderstorm	 11d
221	Thunderstorm	ragged thunderstorm	 11d
230	Thunderstorm	thunderstorm with light drizzle	 11d
231	Thunderstorm	thunderstorm with drizzle	 11d
232	Thunderstorm	thunderstorm with heavy drizzle	 11d
300	Drizzle	light intensity drizzle	 09d
301	Drizzle	drizzle	 09d
302	Drizzle	heavy intensity drizzle	 09d
310	Drizzle	light intensity drizzle rain	 09d
311	Drizzle	drizzle rain	 09d
312	Drizzle	heavy intensity drizzle rain	 09d
313	Drizzle	shower rain and drizzle	 09d
314	Drizzle	heavy shower rain and drizzle	 09d
321	Drizzle	shower drizzle	 09d
500	Rain	light rain	 10d
501	Rain	moderate rain	 10d
502	Rain	heavy intensity rain	 10d
503	Rain	very heavy rain	 10d
504	Rain	extreme rain	 10d
511	Rain	freezing rain	 13d
520	Rain	light intensity shower rain	 09d
521	Rain	shower rain	 09d
522	Rain	heavy intensity shower rain	 09d
531	Rain	ragged shower rain	 09d
600	Snow	light snow	 13d
601	Snow	Snow	 13d
602	Snow	Heavy snow	 13d
611	Snow	Sleet	 13d
612	Snow	Light shower sleet	 13d
613	Snow	Shower sleet	 13d
615	Snow	Light rain and snow	 13d
616	Snow	Rain and snow	 13d
620	Snow	Light shower snow	 13d
621	Snow	Shower snow	 13d
622	Snow	Heavy shower snow	 13d
701	Mist	mist	 50d
711	Smoke	Smoke	 50d
721	Haze	Haze	 50d
731	Dust	sand/ dust whirls	 50d
741	Fog	fog	 50d
751	Sand	sand	 50d
761	Dust	dust	 50d
762	Ash	volcanic ash	 50d
771	Squall	squalls	 50d
781	Tornado	tornado	 50d
800	Clear	clear sky	 01d
801	Clouds	few clouds: 11-25%	 02d  02n
802	Clouds	scattered clouds: 25-50%	 03d
802	Clouds	scattered clouds: 25-50%   03n
803	Clouds	broken clouds: 51-84%	 04d
803	Clouds	broken clouds: 51-84%  04n
804	Clouds	overcast clouds: 85-100%	 04d
804	Clouds	overcast clouds: 85-100%  04n
`.split(/\n\s*/).reduce(
  (r, item) => {
    const weatherImages = {
      'Drizzle': 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201707/drizzle-647_072717054006.jpg',
      'Thunderstorm': 'https://media1.fdncms.com/stranger/imager/u/large/41336007/1568055516-gettyimages-1036655058.jpg',
      'Rain': 'https://www.thoughtco.com/thmb/8vrwFz04uskj25rAk-6NPDoxEK4=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-591910329-56f6b5243df78c78418c3124.jpg',
      'Snow': 'https://res.cloudinary.com/j2ski/albums/u44159/20190527/Perisher_27_May',
      'Mist': 'http://www.stileantico.co.uk/wp-content/uploads/2013/10/dsc_2030.jpg',
      'Smoke': 'https://www.brandsynario.com/wp-content/uploads/2017/11/karachi-leaf.jpg',
      'Haze': 'http://news.mit.edu/sites/mit.edu.newsoffice/files/styles/news_article_image_top_slideshow/public/images/2018/Haze-Singapore-00_0.jpg?itok=EiW93j9Q',
      'Dust': 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201806/Delhi_Dust_KC_Twitter.jpeg?aVxK70ewz5Ds.ktexif.6v280TAGWHge',
      'Fog': 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201901/Indian_Railways-Fog.png?l3ah7Ek7yGFZjiV5JGkwpikpL533LG7x',
      'Sand': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwyEwK585C2jSHaO2mH0bhe2VQDsIjQgcYOegQa--8kWdI00wg',
      'Ash':'https://e3.365dm.com/19/06/768x432/skynews-karo-indonesia-volcano_4691411.jpg',
      'Squall': 'https://images.fineartamerica.com/images-medium-large-5/summer-rain-squalls-pamela-weston.jpg',
      'Tornado': 'https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/hurricane--tornado/tornado-in-the-usa.-photo-matt-clark.jpg',
      'Clear': 'https://ak6.picdn.net/shutterstock/videos/723256/thumb/1.jpg',
      'Clouds': 'https://www.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/sg-visitors-guide/blue-sky-clouds_1000x557.jpg'
    }
    const [id, main, ...rest] = item.split(/\s+/);
    const iconId = rest[rest.length - 1];
    const desc = rest.slice(0, rest.length - 1).join(' ');
    return Object.assign(r, { [id]: { iconId, desc, main, iconUrl: weatherImages[main] } })}
  ,
  {}
);
