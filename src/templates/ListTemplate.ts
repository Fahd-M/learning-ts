import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement, 
    clear(): void, 
    render(fullList: FullList): void,
}

// clear method clears html in ul
// render should render the list

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement 

    static instance: ListTemplate = new ListTemplate()
    
    private constructor() {
        // Did not pass ul in any parameters, instead will absolutely assign it 
        this.ul = document.getElementById("listItems") as HTMLUListElement
        // Using an Assertion 
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id //using getter
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement 
            button.className = "button"
            button.textContent = "X"
            li.append(button)

            button.addEventListener('click', () => {
                fullList.removeItem(item.id) 
                this.render(fullList)
            })

            this.ul.append(li)

        })
    }
}