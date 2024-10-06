/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0idmbpiyhzn2o5n",
    "created": "2024-10-06 10:06:40.414Z",
    "updated": "2024-10-06 10:06:40.414Z",
    "name": "checkpoint",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ozzomu9h",
        "name": "skill",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "xuc51uwt24e14xa",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "bfclry4w",
        "name": "interest",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 10,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "ps307s03",
        "name": "level",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 10,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "entktzcx",
        "name": "note",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0idmbpiyhzn2o5n");

  return dao.deleteCollection(collection);
})
