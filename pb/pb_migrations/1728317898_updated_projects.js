/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hwievjsbm1remkt")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_9g2DKP0` ON `projects` (`project_number`)",
    "CREATE UNIQUE INDEX `idx_aczJGIr` ON `projects` (`name`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ck7nvka1",
    "name": "project_number",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qybjaxjs",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hwievjsbm1remkt")

  collection.indexes = []

  // remove
  collection.schema.removeField("ck7nvka1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qybjaxjs",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
