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
			// { id: 0, name: 'Steak Dinner', calories: 1200 },
			// { id: 1, name: 'Cookie', calories: 400 },
			// { id: 2, name: 'Eggs', calories: 300 },
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

		getItemById: function (id) {
			let found = null;
			//loop through items
			data.items.forEach(function (item) {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},
		updateItem: function (name, calories) {
			//calories to number
			calories = parseInt(calories);

			let found = null;

			data.items.forEach(function (item) {
				if (item.id === data.currentItem.id) {
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},

		deleteItem: function (id) {
			//get ids
			ids = data.items.map(function (item) {
				return item.id;
			});

			//get index
			const index = ids.indexOf(id);

			//remove item
			data.items.splice(index, 1);
		},

		clearAllItems: function () {
			data.items = [];
		},

		setCurrentItem: function (item) {
			data.currentItem = item;
		},

		getCurrentItem: function () {
			return data.currentItem;
		},

		getTotalCalories: function () {
			let total = 0;

			//loop through items and add cals
			data.items.forEach(function (item) {
				total += item.calories;
			});
			//set total cal in data str.
			data.totalCalories = total;

			//return ttoal
			return data.totalCalories;
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
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		addBtn: '.add-btn',
		backBtn: '.back-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		totalCalories: '.total-calories',
		listItems: '#item-list li',
		clearBtn: '.clear-btn',
	};

	//public methods
	return {
		populateItemList: function (items) {
			let html = '';

			items.forEach(function (item) {
				html += `<li class="collection-item edit-item" id="item-${item.id}">
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

		addListItem: function (item) {
			//show the list
			document.querySelector(UISelectors.itemList).style.display = 'block';
			//create li element
			const li = document.createElement('li');
			//add class
			li.className = 'collection-item';
			//add id
			li.id = `item-${item.id}`;
			//add html
			li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
			<a href="#" class="secondary-content">
			  <i class="edit-item fa fa-pencil"></i>
			</a>`;
			//insert item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
		},

		deleteListItem: function (id) {
			const itemID = `#item-${id}`;
			const item = document.querySelector(itemID);
			item.remove();
		},
		updateListItem: function (item) {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			//have nodelist need to loop through so turn to array first
			listItems = Array.from(listItems);

			listItems.forEach(function (listItem) {
				const itemID = listItem.getAttribute('id');

				if (itemID === `item-${item.id}`) {
					document.querySelector(
						`#${itemID}`
					).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
					<a href="#" class="secondary-content">
					  <i class="edit-item fa fa-pencil"></i>
					</a>`;
				}
			});
		},

		clearInput: function () {
			document.querySelector(UISelectors.itemNameInput).value = '';

			document.querySelector(UISelectors.itemCaloriesInput).value = '';
		},

		addItemToForm: function () {
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;

			document.querySelector(
				UISelectors.itemCaloriesInput
			).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},

		removeItems: function () {
			let listItems = document.querySelectorAll(UISelectors.listItems);
			//turn node list into array
			listItems = Array.from(listItems);
			listItems.forEach(function (item) {
				item.remove();
			});
		},

		hideList: function () {
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},

		showTotalCalories: function (totalCalories) {
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},

		clearEditState: function () {
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';
		},
		showEditState: function () {
			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';
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

		//disable submit on enter
		document.addEventListener('keypress', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		});

		//edit icon click
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

		//update item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		//delete item event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

		//back button event
		document
			.querySelector(UISelectors.backBtn)
			.addEventListener('click', UICtrl.clearEditState);

		//clear button event
		document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
	};

	//itemAddSubmit
	const itemAddSubmit = function (e) {
		//get form input from UI COntroller
		const input = UICtrl.getItemInput();

		//check for name and calorie input
		if (input.name !== '' && input.calories !== '') {
			//add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);
			//add item to UI list
			UICtrl.addListItem(newItem);

			//Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			//add total calories to UI
			UICtrl.showTotalCalories(totalCalories);

			//clear fields
			UICtrl.clearInput();
		}

		e.preventDefault();
	};

	//click edit item
	const itemEditClick = function (e) {
		if (e.target.classList.contains('edit-item')) {
			//get list item id (item-0, item-1)
			const listId = e.target.parentNode.parentNode.id;
			//Break into an array
			const listIdArr = listId.split('-');
			//get actual id ( #)
			const id = parseInt(listIdArr[1]);
			//get item
			const itemToEdit = ItemCtrl.getItemById(id);
			//set current item
			ItemCtrl.setCurrentItem(itemToEdit);
			//add item to form
			UICtrl.addItemToForm();
		}
		e.preventDefault();
	};

	const itemDeleteSubmit = function (e) {
		const currentItem = ItemCtrl.getCurrentItem();

		//delete from data str
		ItemCtrl.deleteItem(currentItem.id);
		//delete from UI
		UICtrl.deleteListItem(currentItem.id);
		//get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		//add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		UICtrl.clearEditState();
		e.preventDefault();
	};
	//update item submit
	const itemUpdateSubmit = function (e) {
		//get item input
		const input = UICtrl.getItemInput();

		//update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

		UICtrl.updateListItem(updatedItem);
		//Get total calories
		const totalCalories = ItemCtrl.getTotalCalories(); //update item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
		//delete from data str
		ItemCtrl.currentItem.id;
		e.preventDefault();
	};

	//clear all items event
	const clearAllItemsClick = function () {
		//delete all items from data str
		ItemCtrl.clearAllItems();
		//get cal
		const totalCalories = ItemCtrl.getTotalCalories();
		//add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		UICtrl.clearEditState();
		//remove from UI
		UICtrl.removeItems();

		//hide list
		UICtrl.hideList();
	};
	//returns are publuc
	return {
		init: function () {
			//clear edit state /set initial state
			UICtrl.clearEditState();

			//fetch items from data structure
			const items = ItemCtrl.getItems();
			//check if any items
			if (items.length === 0) {
				UICtrl.hideList();
			} else {
				//populate
				UICtrl.populateItemList(items);
			}
			//populate list w/ items
			//		UICtrl.populateItemList(items);

			//Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			//add total calories to UI
			UICtrl.showTotalCalories(totalCalories);

			//load event listeners
			loadEventListeners();
		},
	};
})(ItemCtrl, UICtrl);

App.init();
