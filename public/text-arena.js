const hiddenLogs = [...document.querySelectorAll('.hidden-log')];
const fightBtn = document.querySelector('.fightBtn');
let click = 0;

fightBtn.addEventListener('click', () => {

    if (click < hiddenLogs.length) {
        hiddenLogs[click].classList.toggle('hidden-log');
        click++;
    }
})