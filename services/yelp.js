import axios from 'axios'; // 0.18.0

let YELP_API_KEY = 'xxxx'

const api = axios.create({
	baseURL: 'https://api.yelp.com/v3',
	headers: {
		Authorization: `Bearer ${YELP_API_KEY}`,
	},
});

class YelpService {
	 getCoffeeShops = userLocation => {
		return api
			.get('/businesses/search', {
				params: {
					limit: 10,
					categories: 'coffee, coffeeroasteries, coffeeshops',
					...userLocation
				},
			})
			.then(res =>
				res.data.businesses.map(business => {
					return {
						name: business.name,
						coords: business.coordinates,
					}
				})
			)
			.catch(error => console.error(error))
	}
}

export default new YelpService();