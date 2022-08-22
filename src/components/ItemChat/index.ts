import { ItemChat as Item } from "./ItemChat";
import { ItemImg } from "./ItemImg";
import { ItemInfo } from "./ItemInfo";
import { ItemText } from "./ItemText";

export const ItemChat = Object.assign(Item, {
    Img: ItemImg,
    Text: ItemText,
    Info: ItemInfo
})