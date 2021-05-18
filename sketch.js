var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedthepet;
var milkfinished;

//create feed and lastFed variable here
var feed,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
milkfinished=loadImage("milkImage.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedthepet = createButton("Feed the Dog");
  feedthepet.position(700,95);
  feedthepet.mousePressed(feedDog);
  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("red");
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
   if(lastFed>=12){
     text("Last Feed :"+ hour +"PM",350,30);
   }else if(lastFed==0){
     text("last Feed : 12 AM",350,30)
   }else{
     text("Last Feed :"+ hour+ "AM",350,30)
   }
  getFeedTime();
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  
  //write code here to update food stock and last fed time


//function to add food in stock

}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
async function getFeedTime(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
   
  var datetime = responseJSON.datetime;
  hour = datetime.slice(11,13);
  console.log(datetime);
  console.log(hour)
}
