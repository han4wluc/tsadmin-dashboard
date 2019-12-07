

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
            "required": true,
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
    }, {
      "id": 1,
      "label": "company",
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
          "label": "name",
          "type": "string",
          "create": {
              "display": "true"
          },
          "update": {
              "display": "true",
              "editable": "true"
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
}

class EntityService {
    fetchEntities = async () => {
        return Promise.resolve(entitiesResult)
    }

    fetchItems = async () => {
        return Promise.resolve(itemsResult)
    }
}


const entityService = new EntityService()

export {
    entityService
}

export default EntityService
