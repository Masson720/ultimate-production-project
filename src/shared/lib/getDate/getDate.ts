export function getDate(){
    const date = new Date();

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

}

export function getTime(){
    const date = new Date();

    return `${date.getHours()}:${date.getMinutes()}`;
}