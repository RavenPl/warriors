export const pathFinder = (req: string) => {

    switch (req) {
        case "/warriors/arena" :
            return "";
        case "/warriors/hall-of-fame" :
            return "hall-of-fame";
        case "/warriors/create/add" :
            return "create";
        case "/warriors" :
            return ""
    }
}