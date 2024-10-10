/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lace3kk9wbylg8u")

  collection.name = "reflections"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lace3kk9wbylg8u")

  collection.name = "reflection"

  return dao.saveCollection(collection)
})
