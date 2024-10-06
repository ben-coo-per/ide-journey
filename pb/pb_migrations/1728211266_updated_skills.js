/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xuc51uwt24e14xa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nr9rgdww",
    "name": "hardness",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 7,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xuc51uwt24e14xa")

  // remove
  collection.schema.removeField("nr9rgdww")

  return dao.saveCollection(collection)
})
