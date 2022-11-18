const formInputs = [...document.querySelectorAll('.formInput')];
const spanTotalPoints = document.querySelector('.warrior-points');

const pointsToAssign = 10;

formInputs.forEach(input => input.addEventListener('change', () => {

    const value = formInputs.map(obj => Number(obj.value)).reduce((prev, curr) => prev + curr, 0);
    spanTotalPoints.textContent = `You have ${pointsToAssign - value} points left to assign!`;

    switch (true) {
        case ((pointsToAssign - value) === 0) :
            spanTotalPoints.classList.add('green');
            spanTotalPoints.textContent = `Points assigned correctly!`;
            break;
        case ((pointsToAssign - value) === 1):
            spanTotalPoints.textContent = `You have 1 point left to assign!`;
            spanTotalPoints.classList.remove('green');
            break;
        case ((pointsToAssign - value) < 0):
            spanTotalPoints.textContent = `You have no points left to assign! (${pointsToAssign - value})`;
            spanTotalPoints.classList.remove('green');
            break;
    }
}))
