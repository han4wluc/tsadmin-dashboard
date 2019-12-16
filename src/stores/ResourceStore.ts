
import { action, observable, computed } from 'mobx'

class ResourceStore<T> {
    constructor(
        items: T[] = [],
        idExtractor: (item: T) => any = (x) => x,
        selectedId?: any
    ) {
        this.items = items
        this.idExtractor = idExtractor
        this.selectedId = selectedId
    }

    private idExtractor: (item: T) => boolean
  
    @observable items: T[]
    @observable selectedId?: any

    @computed get selectedItem() {
        if(this.selectedId === undefined) {
            return undefined
        }
        const selectedItem = this.items.filter(e => this.idExtractor(e) === this.selectedId)[0]
        return selectedItem
    }
    
    @action append(item: T, allowDuplicate: boolean = false) {
        if (allowDuplicate) {
            this.items.push(item)
            return
        }
        const index = this.items.map(this.idExtractor).indexOf(this.idExtractor(item))
        if (index === -1) {
            this.items.push(item)
            return
        }
        this.items[index] = item
    }
  
    @action appendMultiple(items: T[], allowDuplicate: boolean = false) {
        if (allowDuplicate) {
            this.items = this.items.concat(items)
            return
        }
        items.forEach((item) => {
            this.append(item, allowDuplicate)
        })
    }

    @action replace(items: T[]) {
        this.items = items
    }
  
    @action remove(id: any) {
        this.items = this.items.filter((x) => this.idExtractor(x) !== id)
    }

    @action setSelectedId(id: any) {
        this.selectedId = id
    }

    @action removeSelectedId() {
        this.selectedId = undefined
    }
}

export default ResourceStore
