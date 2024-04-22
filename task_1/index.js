import { encoded, translations } from './data.js'

// console.log("Let's rock")
// console.log(encoded, translations)

function decode(encoded, translations) {
  const res = [];
  const idCounter = {};
  for (let i = 0; i < encoded.length; i++) {
    const obj = {};
    for(const key in encoded[i]) {
      const encodedItem = encoded[i][key];
      if(idCounter[encodedItem]) {
        idCounter[encodedItem]++
      } else {
        idCounter[encodedItem] = 1
      }
      // не уверен нужно ли ключи со значением Null приравнивать к '0'
      // но если нужно, то можно так:
      // if(key!=='groupId' && key.endsWith('Id')) {
      //   if(encodedItem===null) encodedItem = '0';
      //   obj[key] = translations[encodedItem]
      // }
      if(key!=='groupId' && key.endsWith('Id') && encodedItem!=null) {
        obj[key] = translations[encodedItem]
      } else {
        obj[key] = encodedItem
      }

    }
    res.push(obj)
  }
  
  const uniqueIds = [];
  for(const key in idCounter) {
    if(idCounter[key]===1) {
      uniqueIds.push(key)
    }
  }
  console.log(uniqueIds)
  return res;
}

const decoded = decode (encoded, translations);

console.log(decoded)
