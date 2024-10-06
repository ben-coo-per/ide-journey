/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0idmbpiyhzn2o5n")

  collection.name = "checkpoints"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "np2iqvmd",
    "name": "projects",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "hwievjsbm1remkt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0idmbpiyhzn2o5n")

  collection.name = "checkpoint"

  // remove
  collection.schema.removeField("np2iqvmd")

  return dao.saveCollection(collection)
})
