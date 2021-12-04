const { Matrix } = require("ml-matrix");
const fs = require('fs');

//reads in the file that we are using
var inputFile = fs.readFileSync("test5.txt", "utf8");

//parses the file into arrays that we are then able to use
let inputArr = inputFile.split("\n");
let i = 0;
for(row of inputArr){
    inputArr[i] = row.trim().split(" ");
    if(i != 1 && i != 2){
        let x = 0;
        for(item of inputArr[i]){
            inputArr[i][x] = parseInt(item);
            x++;
        }
    }
    i++;
}

//setting up some variables
let x = 0;
//used to store the item as key and number of links to it as the value
let suggestion = new Map();
//this variable is used to figure out who we want to find recomendations for
let user1 = 0;
//finds out which array corresponds to the user
while(x < inputArr[0][1]){
    if(inputArr[1][x] == 'User1'){
        user1 = x + 3;
        break;
    }
    x++;
}

//goes through the data to look for what items the user has liked by seing if the value is 1
x = 0;
while(x < inputArr[0][1]){
    if(inputArr[user1][x] == 1){
        let i = 0;
        //if the user liked this item then this loop is to find out who else liked this item
        while(i < inputArr[0][0]){
            if(inputArr[i + 3][x] == 1){
                let j = 0;
                //this final loop is to find out what else the people who liked the same item also liked
                while(j < inputArr[0][1]){
                    if(inputArr[i+3][j] == 1){
                        if(suggestion.has(inputArr[2][j])){
                            suggestion.set(inputArr[2][j], suggestion.get(inputArr[2][j]) + 1);
                        }else{
                            suggestion.set(inputArr[2][j], 1);
                        }
                    }
                    j++;
                }
            }
            i++;
        }
    }
    x++;
}

x = 0;
let values = new Set();
//removes any items from the map that the user we are looking for has already liked
while(x < inputArr[0][1]){
    if(inputArr[user1][x] == 1){
        suggestion.delete(inputArr[2][x]);
    }else{
        //making a set of all of the number of connections, this is used to sort the map
        values.add(suggestion.get(inputArr[2][x]));
    }
    x++;
}
//makes the set into an awway so that we can sort it
let arrValues = Array.from(values);
arrValues.sort().reverse();
//goes through the array and for every value prints out all of the keys and the values associated with them, however this is in descending order since the array is in descending order
for(num of arrValues){
    getByValue(suggestion, num);
}
//this function is used to find keys by their values.
function getByValue(map, searchValue){
    for (let [key, value] of map.entries()) {
        if (value === searchValue)
          console.log(key + " (" + searchValue + ")");
      }
}