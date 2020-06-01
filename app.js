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
		getItems: function () {
			return data.items;
		},
		logData: function () {
			return data;
		},
	};
})();

//UI Controller
const UICtrl = (function () {
	const UISelectors = {
		itemList: '#item-list',
	};

	//public methods
	return {
		populateItemList: function (items) {
			let html = '';
			items.forEach(function (item) {
				html += `      <li class="collection-item edit-item" id="item-${item.id}">
				<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
				  <i class="fa fa-pencil"></i>
				</a>
			 </li>`;
			});
			//Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
	};
})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
	//returns are publuc
	return {
		init: function () {
			console.log('initializing app');

			//fetch items from data structure
			const items = ItemCtrl.getItems();
			//populate list w/ items
			UICtrl.populateItemList(items);

			console.log(items);
		},
	};
})(ItemCtrl, UICtrl);

App.init();
