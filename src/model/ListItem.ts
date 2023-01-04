// Creating a model for our list item

export interface Item {
    id: string,
    item:string,
    checked:boolean,
}

export default class ListItem implements Item {

    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false,
    ) {} //do not need assignment in the {} since we provided them in the constructor


    //implement interface with getters and setters
    get id(): string {
        return this._id
    }

    set id(id:string) {
        this._id = id
    }

    //get the item, return this._item 
    get item(): string {
        return this._item 
    }

    // set item, it receives item
    set item(item:string) {
        this._item = item
    }

    get checked(): boolean {
        return this._checked 
    }

    set checked(checked:boolean) {
        this._checked = checked
    }

}