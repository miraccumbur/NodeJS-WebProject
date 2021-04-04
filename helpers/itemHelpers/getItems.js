const Item = require("../../models/items");

//Get Items For Backend
const getItems = async () => {
  const items = await Item.find();
  return items;
};

//Get Items For Show Page
const getItemsForShowPages = async () => {
  let itemsInStock = [];
    const items = await Item.find().lean();

    for(let i =0;i<items.length;i++){
      console.log(items[i].stock);
      
      if(parseInt(items[i].stock)>0){
        itemsInStock.push(items[i]);
      }
    }
    
    return itemsInStock;
  };

module.exports = {
  getItems,getItemsForShowPages
};
