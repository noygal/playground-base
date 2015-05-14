export class Logic {
	constructor() {
		
	}
	
	findZeroRouteSolution(routesRaw) {
		var routes = [];
		var table = [[],[],[]];
		routesRaw.forEach((route, index) =>{
			routes.push(JSON.parse(route));
		});
		routes[0].sort((a, b) =>{
			return a.index > b.index;
		});
		routes[1].sort((a, b) =>{
			return a.index < b.index;
		});
		routes[0].forEach((element0, index0) => {
			routes[1].forEach((element1, index1) => {
				table[index0][index1] = element0.score + element1.score;
			});
		});
		
		var result = [];
		var maxIndex = 2;
		
		recFinder(0, 0, 0);
		return result;
		
		function recFinder(index0, index1, index2) {
			var cell = table[index0][index1];
			var value = routes[2][index2].score;
			var sum = cell + value;
			if (sum === 0) result = [routes[0][index0], routes[1][index1], routes[2][index2]];
			if (sum < 0 && index0 + 1 <= maxIndex) recFinder(index0 + 1, index1, index2);
			if (sum > 0 && index1 + 1 <= maxIndex) recFinder(index0, index1 + 1, index2);
			if (index2 + 1 <= maxIndex) recFinder(index0, index1, index2 + 1);
		}
		
	}
	
	findZeroRoute(routes) {
		//Flatten arrays
		var array = [];
		routes.forEach((route, index) =>{
			route = JSON.parse(route);
			route.forEach((user) => {
				user.index = index;
				array.push(user);
			});
		});
//		console.log(array);
		array.sort((a, b) =>{
			return a.index > b.index;
		});
		array.sort((a, b) =>{
			return a.score > b.score;
		});
		console.log(array);
		
		
		function createRecCall(userIndex, maxIndex) {
			return function(user, index, array){
//				if (user.index !== userIndex) return;
				result.push(user);
				if (result.length !== maxIndex) return result.pop();
				if (maxIndex <= index)
					array.slice(index).forEach(createRecCall(userIndex + 1, maxIndex));
				console.log(userIndex + '-' + maxIndex)
				console.log(result);
				var sum = result.reduce((previousValue, currentValue) => {
					return previousValue + currentValue;
				});
				if (sum !== 0) return result.pop();
				console.log('result');
				console.log(result);
			}
		}
		
		var result = [];
		var isDone = false;
//		array.forEach(createRecCall(0, 2));
		
		array.forEach((user1, index1, array1) => {
			if (isDone) return;
			result.push(user1);
			array1.slice(index1).forEach((user2, index2, array2)=> {
				if (isDone) return;	
				result.push(user2);
				array2.slice(index2).forEach((user3, index3, array3)=> {
					if (isDone) return;
					result.push(user3);
					result.sort((a, b) => {
						return a.index > b.index;
					});
					var sum = 0;
					result.forEach((element) => {
						sum += element.score;
					});
					var isRoute = true;
					result.forEach((element, index) => {
						if (element.index !== index) isRoute = false;
					});
					if (sum === 0 && isRoute) isDone = true;
					if (!isDone) result.pop();
				});
				if (!isDone) result.pop();
			});
			if (!isDone) result.pop();
		});
		return result;
	}
}