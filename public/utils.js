const returnBtn = document.querySelector('.returnBtn');

export function rectangleCollision(rectangle1, rectangle2) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

export const goBack = () => {
    let time = 5;

    const id = setInterval(() => {

        time--;
        returnBtn.textContent = `Return (${time})`;

        if (time === 0) {
            clearInterval(id);
            window.location.href = `http://localhost:3000/warriors`;
        }
    }, 1000);
}
