/** @format */

//storage controller

//Item controller
const ItemCtrl = (function () {
	//item constructor
	const Item = function (id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

	//data structure (state)
	const data = {
		items: [
			{ id: 0, name: 'Steak Dinner', calories: 1200 },
			{ id: 1, name: 'Cookie', calories: 400 },
			{ id: 2, name: 'Eggs', calories: 300 },
		],
		currentItem: null,
		totalCalories: 0,
	};
	//have to return to be able to publicly access
	return {
		logData: function () {
			return data;
		},
	};
})();

//UI Controller
const UICtrl = (function () {})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
	//returns are publuc
	return {
		init: function () {
			console.log('initializing app');
		},
	};
})(ItemCtrl, UICtrl);

App.init();
