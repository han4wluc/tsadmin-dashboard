
import axios from 'axios'

const entitiesResult = {
    "entities": [{
        "id": 0,
        "label": "users",
        "deleatable": true,
        "columns": [{
            "label": "id",
            "type": "uuid",
            "create": {
                "display": false
            },
            "update": {
                "display": true,
                "editable": false
            }
        }, {
            "label": "username",
            "type": "string",
            "required": true,
            "create": {
                "display": true
            },
            "update": {
                "display": true,
                "editable": true
            }
        }, {
            "label": "nickname",
            "type": "string",
            "create": {
                "display": true
            },
            "update": {
                "display": true,
                "editable": true
            }
        },{
            "label": "birthday",
            "type": "date",
            "create": {
                "display": true,
            },
            "update": {
                "display": true,
                "editable": true
            }
        }, {
            "label": "age",
            "type": "number",
            "create": {
                "display": true,
                "default": 18
            },
            "update": {
                "display": true,
                "editable": true
            }
        }, {
            "label": "notes",
            "type": "text",
            "create": {
                "display": true
            },
            "update": {
                "display": true,
                "editable": true
            }
        }, {
            "label": "meta",
            "type": "json",
            "create": {
                "display": true
            },
            "update": {
                "display": true,
                "editable": true
            }
        },{
            "label": "gender",
            "type": "enum",
            "enum": ["male", "female"],
            "create": {
                "display": true,
                "default": "male"
            },
            "update": {
                "display": true,
                "editable": true
            }
        }, {
            "label": "company",
            "type": "relationshipOne",
            "relationshipModel": "Company",
            "create": {
                "display": true
            },
            "update": {
                "display": true,
                "editable": true
            }
        }, {
            "label": "articles",
            "type": "relationshipMany",
            "relationshipModel": "Article",
            "create": {
                "display": true
            },
            "update": {
                "display": true,
                "editable": true
            }
        }, {
            "label": "createdAt",
            "type": "datetime",
            "create": {
                "display": false
            },
            "update": {
                "display": true,
                "editable": false
            }
        }, {
            "label": "updatedAt",
            "type": "datetime",
            "create": {
                "display": false
            },
            "update": {
                "display": true,
                "editable": false
            }
        }]
    }, {
      "id": 1,
      "label": "company",
      "deleatable": true,
      "columns": [{
          "label": "id",
          "type": "uuid",
          "create": {
              "display": false
          },
          "update": {
              "display": true,
              "editable": false
          }
      }, {
          "label": "name",
          "type": "string",
          "create": {
              "display": true
          },
          "update": {
              "display": true,
              "editable": true
          }
      }],
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

const itemsResult = {
    items: [{
        id: 0,
        username: 'user1',
        nickname: 'mick',
        age: 8,
        birthday: '1999-10-22',
        gender: 'male',
        notes: 'he is very good',
        company: 'Gule',
        articles: [],
        meta: {
            id: 4,
            count: 5
        },
        createdAt: '2007-12-28T23:11:57.056-07:00',
        updatedAt: '2008-12-28T23:13:57.056-07:00'
      }, {
        id: 1,
        username: 'user2',
        nickname: 'mudord',
        birthday: '1999-10-22',
        age: 12,
        notes: 'he talks very fast\n he has a lot of concentration',
        gender: 'male',
        company: 'Gule',
        articles: [],
        meta: {
            id: 3,
            count: 5,
            name: 'gjfaljkfealrjeaw wer'
        },
        createdAt: '2007-12-28T23:11:57.056-07:00',
        updatedAt: '2008-12-28T23:13:57.056-07:00'
      }]
}

class EntityService {

    createEntity = async (entityName: string, data: any) => {
        const res = await axios.post<any, any>(`http://localhost:8000/${entityName}`, data)
        return res.data
        // return new Promise((resolve) => {
        //     setTimeout(resolve, 2000)
        // })
    }

    updateEntity = async (entityName: string, id: any, data: any) => {
        const res = await axios.patch<any, any>(`http://localhost:8000/${entityName}/${id}`, data)
        return res.data
        // return new Promise((resolve) => {
        //     setTimeout(resolve, 2000)
        // })
    }

    fetchEntities = async () => {
        const reps = await axios.get<any, any>('http://localhost:8000/entities')
        return reps.data
        // return Promise.resolve(entitiesResult)
    }

    fetchItems = async (entityName: string) => {
        const reps = await axios.get<any, any>(`http://localhost:8000/${entityName}`)
        return reps.data
        // return Promise.resolve(itemsResult)
    }

    deleteItem = async (entityName: string, id: any) => {
        const res = await axios.delete<any, any>(`http://localhost:8000/${entityName}/${id}`)
        return res.data
    }
}


const entityService = new EntityService()

export {
    entityService
}

export default EntityService
