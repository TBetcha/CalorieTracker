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

		addItem: function (name, calories) {
			let ID;
			//create id
			if (data.items.length > 0) {
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}

			calories = parseInt(calories);

			//create new item
			newItem = new Item(ID, name, calories);

			//push to data structure
			data.items.push(newItem);

			return newItem;
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
		addBtn: '.add-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
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
		getItemInput: function () {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value,
			};
		},
		getSelectors: function () {
			return UISelectors;
		},
	};
})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
	//load event listeners
	const loadEventListeners = function () {
		//UIsel set equal to get selectors so I can use it
		const UISelectors = UICtrl.getSelectors();

		//Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
	};

	//itemAddSubmit
	const itemAddSubmit = function (e) {
		//get form input from UI COntroller
		const input = UICtrl.getItemInput();

		//check for name and calorie input
		if (input.name !== '' && input.calories !== '') {
			//add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);
		}

		e.preventDefault();
	};

	//returns are publuc
	return {
		init: function () {
			console.log('initializing app');

			//fetch items from data structure
			const items = ItemCtrl.getItems();
			//populate list w/ items
			UICtrl.populateItemList(items);

			//load event listeners
			loadEventListeners();
		},
	};
})(ItemCtrl, UICtrl);

App.init();
