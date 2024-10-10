/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lace3kk9wbylg8u",
    "created": "2024-10-10 08:01:43.888Z",
    "updated": "2024-10-10 08:01:43.888Z",
    "name": "reflection",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mmuzykcw",
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
  const collection = dao.findCollectionByNameOrId("lace3kk9wbylg8u");

  return dao.deleteCollection(collection);
})
