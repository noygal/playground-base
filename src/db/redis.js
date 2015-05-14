var Promise = require('es6-promise').Promise; 
var redis = require('redis');

export class RedisConnector {
	constructor(host, port, options) {
		this.client = redis.createClient(port, host);
		this.client
			.on('error', function (err) {
		        console.log('Error ' + err);
		    })
			.on('ready', function (data) {
		        console.log('Ready ' + data);
		    })
			.on('connect', function (data) {
		        console.log('Connected ' + data);
		    });
	}
	
	getRoutes() {
		return new Promise((resolve, reject) => {
			this.client.mget(['Route-1', 'Route-2', 'Route-3'], (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		});
	}
}