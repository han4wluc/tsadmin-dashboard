
import { action, observable } from 'mobx'

class ResourceStore<T> {
    constructor(
        items: T[] = [],
        idExtractor: (item: T) => any = (x) => x
    ) {
        this.items = items
        this.idExtractor = idExtractor
    }
  
    @observable items: T[]

    private idExtractor: (item: T) => boolean
    
    @action append(item: T, allowDuplicate: boolean = false) {
        if (allowDuplicate) {
            this.items.push(item)
            return
        }
        const found = this.items.map(this.idExtractor).includes(this.idExtractor(item))
        if (!found) {
            this.items.push(item)
        }
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
  
    @action remove(id: any) {
        this.items = this.items.filter((x) => this.idExtractor(x) !== id)
    }
}

export default ResourceStore
