

import { action, observable, computed } from 'mobx'
import {BaseStore, IStoreDependencies} from '../../utils/mobxConnect'

export type Entity = {
    id: number,
    label: string,
    columns: any
}

export interface IEntityTableDependencies extends IStoreDependencies {}



const entitiesResult = {
  "entities": [{
      "id": 0,
      "label": "users",
      "deleatable": "true",
      "columns": [{
          "label": "id",
          "type": "uuid",
          "create": {
              "display": "false"
          },
          "update": {
              "display": "true",
              "editable": "false"
          }
      }, {
          "label": "username",
          "type": "string",
          "create": {
              "display": "true"
          },
          "update": {
              "display": "true",
              "editable": "true"
          }
      }, {
          "label": "nickname",
          "type": "string",
          "create": {
              "display": "true"
          },
          "update": {
              "display": "true",
              "editable": "true"
          }
      }, {
          "label": "age",
          "type": "number",
          "create": {
              "display": "true",
              "default": 18
          },
          "update": {
              "display": "true",
              "editable": "true"
          }
      }, {
          "label": "gender",
          "type": "enum",
          "enum": ["male", "female"],
          "create": {
              "display": "true",
              "default": "male"
          },
          "update": {
              "display": "true",
              "editable": "true"
          }
      }, {
          "label": "company",
          "type": "relationshipOne",
          "relationshipModel": "Company",
          "create": {
              "display": "true"
          },
          "update": {
              "display": "true",
              "editable": "true"
          }
      }, {
          "label": "articles",
          "type": "relationshipMany",
          "relationshipModel": "Article",
          "create": {
              "display": "true"
          },
          "update": {
              "display": "true",
              "editable": "true"
          }
      }, {
          "label": "createdAt",
          "type": "datetime",
          "create": {
              "display": "false"
          },
          "update": {
              "display": "true",
              "editable": "false"
          }
      }, {
          "label": "updatedAt",
          "type": "datetime",
          "create": {
              "display": "false"
          },
          "update": {
              "display": "true",
              "editable": "false"
          }
      }]
  }],
  "customFunctions": [{
      "label": "somelabel",
      "function": "sendNotificationToUser",
      "form": {
          "inputs": [{
              "label": "alertNumber",
              "type": "number",
              "required": true,
              "default": 4
          }, {
              "label": "company",
              "type": "relationshipOne"
              // ...
          }, {
              "label": "payload",
              "type": "json"
          }]
      }
  }]
}



export class EntityTableStore extends BaseStore {
  @observable entitiesLoading: boolean = true
  @observable entities: Entity[] = []
  @observable selectedEntityId?: number
  @observable items: object[] = []
  @observable itemsLoading: boolean = true
  @observable columns: any = []

  @action fetchEntities = async () => {
    this.entitiesLoading = true
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 1000)
    // })
    // this.entities = [{
    //     id: 0,
    //     label: 'entity1'
    // }, {
    //     id: 1,
    //     label: 'entity2'
    // }]
    this.entities = entitiesResult.entities
    this.entitiesLoading = false
    return Promise.resolve()
 }

  @action selectEntityId = (entityId: number) => {
      this.selectedEntityId = entityId
      this.fetchData()
  }

  @action fetchData = async () => {
    this.itemsLoading = true

    // await new Promise((resolve) => {
    //   setTimeout(resolve, 1000)
    // })

    // this.items = [{
    //     id: 0,
    //     firstName: 'firstName1'
    // }, {
    //     id: 1,
    //     firstName: 'firstName2'
    // }]
    this.items = [{
      id: 0,
      username: 'user1',
      nickname: 'mick',
      age: 8,
      gender: 'male',
      company: 'Gule',
      articles: [],
      createdAt: 123,
      updatedAt: 943
    }, {
      id: 1,
      username: 'user2',
      nickname: 'mudord',
      age: 12,
      gender: 'male',
      company: 'Gule',
      articles: [],
      createdAt: 126,
      updatedAt: 903
    }]
    this.columns = entitiesResult.entities[0].columns
    this.itemsLoading = false
  }

  mount() {
      this.fetchEntities().then(() => {
        if (this.entities.length > 0) {
          this.selectEntityId(this.entities[0].id)
        }
      })
    }
}
