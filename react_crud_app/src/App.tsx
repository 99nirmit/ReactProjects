import { useState } from "react";

const App = () => {

  // setting the data

  const [items, setItems] = useState([
    {id: 1, name: "Mobile"},
    {id: 2, name: "T.V."},
    {id: 3, name: "Laptop"},
    {id: 4, name: "Tablet"}
  ]);

  // Crud Operation will start from here

  //1. Create Add Item
const addItem = (name) => {
  // Create a new item with a unique id and the provided name
  const newItem = { id: items.length + 1, name };

  // Add the new item to the existing items array using the spread operator
  setItems([...items, newItem]);
};

// 2. Read (Display Items):
const displayItems = items.map((item) => (
  <div key={item.id}>
    <span>{item.id}</span>
    <button onClick={() => updateItem(item.id)}>Edit</button>
    <button onClick={() => deleteItem(item.id)}>Delete</button>
  </div>
));

// 3. Update (Edit Item):
const updateItem = (id) => {
  const updateName = prompt("Enter the new Name");
  if(updateName){
    const updateItems = items.map((item) => 
    item.id === id ? {...item, name: updateName} : item
  );
  setItems(updateItems); 
}
};

// 4. Delete (Remove Item):
const deleteItem = (id) => {
  const updateItems = items.filter((item) => item.id !== id);
  setItems(updateItems);
};

const handleSubmit = (e) => {
  e.preventDefault();
  addItem(e.target.itemName.value);
};
  
  return( 
  <div className="App">
    {displayItems}
    <form onSubmit={handleSubmit}>
      <input type="text" name="itemName" placeholder="Enter item Name"/>
      <button type="submit">Add Item</button>
    </form>
  </div>
  );
};
export default App;