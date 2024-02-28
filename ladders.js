let player1 = {
    location: 1,
    player: "👨‍⚖️1"

};
let player2 = {
    location: 1,
    player: "👨‍⚖️2"
};
let cube = document.createElement('div')
cube.classList.add('cube')
document.body.appendChild(cube);
const board = document.createElement('div');
board.id = 'ladderSnakes';
document.body.appendChild(board);
let mission = document.createElement('p');
mission.style.fontSize='50px'
document.body.appendChild(mission);
board.style.flexDirection = 'row-reverse';
let count = 100;
let item;
// לולאה אשר יוצרת את לוח המשחק 
for (let x = 1; x < 11; x++) {
    for (let y = 1; y < 11; y++) {
        item = document.createElement('div')
        item.classList.add('cell');
        item.id =`id${count}`
        board.appendChild(item);
        count--;
        if (count % 10 === 0) {
            board.style.flexWrap = 'wrap'
        }
    }
}
// יצירת כפתור לזריקת קוביוץ. בלחיצה נזרקת קובייה והשחקן מתקדם
const btn = document.createElement('button');
btn.classList.add('btn')
btn.innerText = 'לחץ לזרוק'
document.body.appendChild(btn)
let turn=Math.floor(Math.random()*2)+1;

btn.addEventListener('click', () => {
    if(turn%2===0){
        document.getElementById(`id${player1.location}`).innerText = "";
        throwCube(player1)
       
    }
    else{
        document.getElementById(`id${player2.location}`).innerText = "";
        throwCube(player2)
    }
  
})

function throwCube(player) {

        document.getElementById(`id${player.location}`).innerText="";
    let num = Math.floor(Math.random() * 6) + 1;
    cube.innerText = num;
    player.location = player.location + num;
    mission.innerHTML = "";
    switch(player.location)
{
    case 4:
        player.location=14;
    break;
    case 8:
    player.location = 37;
    break
    case 16:
        mission.innerHTML ='תשיר לי שיר'
        break
        case 22:
            player.location = 32;
            break
        case 23:
            player.location = 13;
            break
            case 29:
         mission.innerHTML = 'תשיר לי שיר';
break
case 30:
    player.location = 19;
    break
    case 34 :
            mission.innerHTML = 'תשיר לי שיר';
break
case 43 :
    player.location = 63;
    break
    case 45:
            player.location = 55;
 break
 case 51:
    player.location = 41 ;
    break
    case 56 :
            mission.innerHTML = 'תשיר לי שיר';
break
case 60:
            player.location = 79;
            break
            case 61:
            player.location = 82;
            break
            case 62:
            mission.innerHTML = 'תשיר לי שיר';
break
case 68:
            player.location = 47;
            break
case 78 :
            player.location = 88;
break
   case 83:
            player.location = 74;
break
   case 89:
            mission.innerHTML = 'תשיר לי שיר';
break
case 94:
            mission.innerHTML = 'תשיר לי שיר';
break
case 100:
            document.getElementById(`id${player2.location}`).innerText = "";
            document.getElementById(`id${player1.location}`).innerText = "";
            player1.location=1;
            player2.location=1;
            alert(`ברכות על הניצחון ל${player.player}`)
            break
     default:
    if (player.location > 100) {
        player.location -= num;
    }
    break;
}
    document.getElementById(`id${player.location}`).innerText = player.player;
    if(turn===1){
        turn=2;
    }
    else{ 
        turn = 1;
    }

}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}