//יצרתי מערך אשר מורכב מארבע אובייקטים. כל אובייקט מייצג נתוני משחק של שחקן פוטנציאלי 
let arrPlayers = [
    { location: 1, player: "👨‍⚖️1", name: "", Points: 0 },
    { location: 1, player: "👨‍⚖️2", name: "", Points: 0 },
    { location: 1, player: "👨‍⚖️3", name: "", Points: 0 },
    { location: 1, player: "👨‍⚖️4", name: "", Points: 0 }
]
//הכרזה על משתנה מטיפוס דיו אשר ייצג את השחקנים אשר רצים על הלוח
let playerStone = document.createElement('div');
// הכרזה על יצירת משתנה אשר ייצג את הליבה של לוח המשח
const board = document.createElement('div');
// id ללוח המשחק
board.id = 'ladderSnakes';
// הוספת לוח המשתנה שמייצג את לוח המשחק לגוף האתר
document.body.appendChild(board);
let mission = document.createElement('p'); // הוספת פסקה שתציג הערות
mission.style.fontSize = '50px'
document.body.appendChild(mission);
// הכיוון הוא הפוך משום שסדר היצירה של האייטמים הוא מהסוף להתחלה כלומר סדר הפוך לכן השתמשי ברברס
board.style.flexDirection = 'row-reverse';
let count = 100;
let item;
let i;

// לולאה אשר יוצרת את לוח המשחק 
for (i = 0; i < 100; i++) {
    item = document.createElement('div')
    item.classList.add('cell');
    item.id = `id${count}`
    board.appendChild(item);
    count--;
    if (count % 10 === 0) {
        board.style.flexWrap = 'wrap'
    }
}
let rect = document.getElementById(`id${1}`).getBoundingClientRect();
console.log('Top:', rect.top);

// יצירת כפתור לזריקת קוביוץ. בלחיצה נזרקת קובייה והשחקן מתקדם
const btn = document.createElement('button');
btn.classList.add('btn');
btn.innerText = 'הטל קובייה';
btn.disabled = true;
document.body.appendChild(btn);
// יצירת ה- select
let select = document.createElement('select');
// הוספת ה- select ל- body של המסמך
document.body.appendChild(select);
let option = document.createElement("option");
option.value = "";
option.text = "'מס שחקנים"
select.appendChild(option);
// לולאה שתוסיף 10 options ל- select
for (i = 1; i <= 4; i++) {
    // יצירת אלמנט option
    option = document.createElement("option");
    // השמת ערך ל- option (במקרה זה, מספר השחקנים)
    option.value = i;
    // הוספת טקסט לתוך ה- option
    option.text = i;
    // הוספת ה- option לתוך ה- select
    select.appendChild(option);
}
// קוביית המשחק
let cube = document.createElement('img')
cube.classList.add('cube')
document.body.appendChild(cube);
// מספר השחקנים שיבחר בהמשך:
let numberPlayers = 0;
// מייצג א התור המשתתף הנוכחי  להטיל קובייה בכל רגע נתון במהלך המשחק
let turn;
// טופס שיכיל את האינפוטים שיוזנו בשמות השחקנים
let form = document.createElement('form');
// אינפו להזנת שמות מתמודדים
let inputName = document.createElement('input');
// כפתור לשילחת השמות למערכת לפני התחלת המשחק
let submitButton = document.createElement('button');
//בפונקציה כאן נבחר כמות המשתתפים
// בעת בחירה על כמות משתתפיםת, תפעל מייד הפונקציה שחאראית על מספר דברים:
//1.איזה שחקן יתחיל במשחק, הוספת הטופס לדף המשחקת במידה ויש רצון להוציא מתמודד יש לולאת וויל ולולאת פור בשביל להוסיף
select.addEventListener('change', () => {
    numberPlayers = select.value;
    turn = Math.floor(Math.random() * numberPlayers);
    document.body.appendChild(form);
    i = form.querySelectorAll('input').length;
    while (i > numberPlayers) {
        form[i - 1].remove();
        i--;
    }
    for (i; i < numberPlayers; i++) {
        let inputName = document.createElement('input');
        inputName.setAttribute('id', `input${i + 1}`)
        inputName.type = 'text';
        inputName.required = true;
        inputName.placeholder = `שם של שחקן מספר${i + 1}`
        form.appendChild(inputName);
    }
    submitButton.setAttribute('id', 'button');
    submitButton.type = 'button';
    submitButton.innerText = 'הזן שמות'
    // submitButton.required = true;
    form.appendChild(submitButton);
})
submitButton.addEventListener('click', () => {
    for (i = 0; i < numberPlayers; i++) {
        let string = document.getElementById(`input${i + 1}`).value;
        arrPlayers[i].name = string;
        let playerStone = document.createElement('div');
        playerStone.setAttribute('id', `player${i}`);
        playerStone.innerText = string;
        playerStone.classList.add("player");
        playerStone.style.top = `${rect.top}px`;
        playerStone.style.left = `${rect.left}px`;
        playerStone.style.backgroundColor = getRandomColor();
        document.body.appendChild(playerStone);
    }
    // .getBoundingClientRect();
    mission.innerHTML = `מתחיל-${arrPlayers[turn].name}`;
    document.body.removeChild(form);
    select.disabled = true;
    btn.disabled = false;
});
btn.addEventListener('click', function () {
    let rollingSound = new Audio('js/SnakesAndLadder_rpg-dice-rolling-95182.mp3');
    rollingSound.play()
    btn.disabled = true;
    select.disabled = true;
    throwCube(arrPlayers[turn]);
});
function throwCube(player) {
    // console.log(`${document.getElementById('player0').offsetTop}px`);
    let rollingSound = new Audio();
    let element = document.getElementById(`id${player.location}`);
    if (element) {
        let newText = element.innerHTML.replace(player.player, "");
        element.innerHTML = newText;
    }
    cube.src = 'js/diceroll.gif';
    setTimeout(() => {
        btn.disabled = false;
        let num = Math.floor(Math.random() * 6) + 1;
        cube.src = `js/dice${num}.svg`
        player.location = player.location + num;
        // turn++;
        // if (turn == numberPlayers) {
        //     mission.innerHTML = `זה התור של שחקן1-${arrPlayers[0].name}`;
        // }
        // else
        // {
        //     mission.innerHTML = `זה התור של שחקן${turn + 1}-${arrPlayers[turn].name}`;
        // }
        switch (player.location) {
            case 4:
                player.location = 14;
                 rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break;
            case 8:
                player.location = 37;
                rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break
            case 16:
                mission.innerHTML = 'תשיר לי שיר'
                break
            case 22:
                player.location = 32;
                 rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break
            case 23:
                player.location = 13;
                rollingSound.src = 'js/land2-43790.mp3';
                rollingSound.play()

                break
            case 29:
                mission.innerHTML = 'תשיר לי שיר';
                break
            case 30:
                player.location = 19;
                rollingSound.src = 'js/land2-43790.mp3';
                rollingSound.play()
                break
            case 34:
                mission.innerHTML = 'תשיר לי שיר';
                break
            case 43:
                player.location = 63;
                rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break
            case 45:
                player.location = 55;
                rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break
            case 51:
                player.location = 41;
                 rollingSound.src = 'js/land2-43790.mp3';
                rollingSound.play()
                break
            case 56:
                mission.innerHTML = 'תשיר לי שיר';
                break
            case 60:
                player.location = 79;
                rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break
            case 61:
                player.location = 82;
                 rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break
            case 62:
                mission.innerHTML = 'תשיר לי שיר';
                break
            case 68:
                player.location = 47;
                 rollingSound.src = 'js/land2-43790.mp3';
                rollingSound.play()

                break
            case 78:
                player.location = 88;
                 rollingSound.src = 'js/climb.mp3';
                rollingSound.play()
                break
            case 83:
                player.location = 74;
               rollingSound.src = 'js/land2-43790.mp3';;
                rollingSound.play()
                break
            case 89:
                mission.innerHTML = 'תשיר לי שיר';
                break
            case 94:
                mission.innerHTML = 'תשיר לי שיר';
                break
            case 100:
                alert(`ברכות על הניצחון ל${player.player}`)
                player.Points++;
                console.log('num of point' + player.Points)
                for (i = 0; i < numberPlayers; i++) {
                    document.getElementById(`id${arrPlayers[i].location}`).innerText = "";
                    arrPlayers[i].location = 1;
                    let loc = document.getElementById(`id${1}`).getBoundingClientRect();
                    let playerStone = document.getElementById(`player${i}`);
                    playerStone.style.top = `${loc.top}px`
                    playerStone.style.left = `${loc.left}px`
                }
                select.disabled = false;
                break
            default:
                if (player.location > 100) {
                    player.location -= num;
                    alert('to much' + player.player)
                }
                break;
        }

        document.getElementById(`id${player.location}`).innerText = player.player;
        let loc = document.getElementById(`id${player.location}`).getBoundingClientRect();
        let playerStone = document.getElementById(`player${turn}`);
        playerStone.style.top = `${loc.top + 5}px`
        playerStone.style.left = `${loc.left + 10}px`

        turn++;
        if (turn >= numberPlayers) {
            turn = 0;
        }
        mission.innerHTML = `זה התור של שחקן - ${arrPlayers[turn].name}`;
    }, 200)
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

