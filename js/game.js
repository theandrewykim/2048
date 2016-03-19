

var Game = function(board){
    var randBoard = this.randomBoard();

    this.boardArray = (board ||randBoard);
    this.score = 0

}

var highScore = 0


Game.prototype.randomBoard = function(){
  var boardArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var numberOfTwos = Math.floor(Math.random() * 4 + 1)
  for(i = 0; i < numberOfTwos; i++){
      boardArray[Math.floor(Math.random() * 16)] = 2
  }
  return boardArray
}

Game.prototype.toString = function(){
printArray = this.boardArray.slice(0)
printArray.splice(4, 0, '\n')
printArray.splice(9, 0, '\n')
printArray.splice(14, 0, '\n')
console.log(printArray.join(''))
  }


Game.prototype.spawnBlock = function() {
  var randomIndex = Math.floor(Math.random() * 16)
  if (this.boardArray[randomIndex] === 0) {
  this.boardArray[randomIndex] = 2
}
  else {
    return this.spawnBlock();
  }
return this.boardArray
}

Game.prototype.rows = function() {
row1 = this.boardArray.slice(0,4)

row2 = this.boardArray.slice(4,8)
row3 = this.boardArray.slice(8,12)
row4 = this.boardArray.slice(12,16)
var rowedBoard = [row1,row2,row3,row4]

return rowedBoard
}

var slide = function(boardArrays){
for(var row of boardArrays){
    for(var index = 1; index < row.length; index++){
      if (row[index-1] === 0){
        row[index - 1] = row[index]
        row[index] = 0}
      }
  }
  return _.flatten(boardArrays)
  }


  var reverserows = function(boardArrays) {
    for(var row of boardArrays){
      row.reverse()
    }
    return boardArrays
  }


Game.prototype.left = function(){
  boardArrays = this.rows();// while (this.board != this.left().board){

  return this.boardArray = slide(boardArrays)
}





Game.prototype.combine = function(){

      boardArrays = this.rows();
      for(var row of boardArrays){
      for(var index = 1; index < row.length; index++){
       if(row[index-1] === row[index]) {
      var sum = parseInt(row[index]) + parseInt(row[index-1])
      row[index-1] = sum
      row[index] = 0
      this.score += sum

       this.boardArray = _.flatten(boardArrays)

      }

  }
}
}


Game.prototype.move = function(direction){
  var previousBoardArray = this.boardArray
  if(direction === "left"){
     while(this.boardArray.join('') != this.left().join('')){
      this.left()
    }
      this.combine()
      this.left()
  }

else if(direction === "right"){
      var reversedRows = reverserows(this.rows())
while(this.boardArray.join('') != slide(reversedRows).join('')){
      this.boardArray = slide(reversedRows)
    }
      this.combine()
      this.boardArray = slide(this.rows())
      this.boardArray = _.flatten(reverserows(this.rows()))}
else if(direction === "up"){
      var transposedRows = _.zip.apply(null,this.rows())
while(this.boardArray.join('') != slide(transposedRows).join('')){
      this.boardArray = slide(transposedRows)
    }
    this.combine()
    this.boardArray = slide(this.rows())
    var unzippedArray = _.zip.apply(null,this.rows())
    this.boardArray = _.flatten(unzippedArray)

  }

else if(direction === "down"){
      var transposedRows = _.zip.apply(null,this.rows())
      var reversedTransposedRows = reverserows(transposedRows)
while(this.boardArray.join('') != slide(reversedTransposedRows).join('')){
      this.boardArray = slide(reversedTransposedRows)
    }
      this.combine()
      this.boardArray = slide(this.rows())
    var TransposedRows = reverserows(this.rows())
    var normalizedRows = _.zip.apply(null,TransposedRows)
    this.boardArray = _.flatten(normalizedRows)
  }
if(previousBoardArray.join('') === this.boardArray.join('')){
     return this.boardArray

   }
   else{
      this.spawnBlock()
      return this.boardArray
}
}

Game.prototype.gameOver = function(){
  var newBoardArray = this.boardArray.slice(0);
  var newGame = new Game(newBoardArray);
  if(newBoardArray.includes(2048)){
    alert("You Win! Your final score was:" + this.score * 100);
  }else if(newBoardArray.join('') === newGame.move("left").join('') && newBoardArray.join('') === newGame.move("right").join('') && newBoardArray.join('') === newGame.move("down").join('') && newBoardArray.join('') === newGame.move("up").join('')){
    alert("You Suck! Your final score was: "+ this.score * 100)

//
  }

}




var game = new Game