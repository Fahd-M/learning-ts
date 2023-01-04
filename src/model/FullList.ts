import ListItem from "./ListItem";

interface List {
    //methods and getter defined with the interface list 
    list:ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id:string): void,
}

export default class FullList implements List {
    
    static instance: FullList =  new FullList()

    //private before the constructor keyword and create a singleton(only 1 instance of the class created)
    private constructor(private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list
    }

    // Load method: retrieve everything from local storage, then create new items from the parsed list
    // then go through parsed list, create a new list item for each one that was stringified and saved into local storage
    // then we populate list again 
    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return 
        
        // ParsedList needs it's own type defined using _'s, since we using _'s that will be saved. no _'s in ListItem.ts
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)
    
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}