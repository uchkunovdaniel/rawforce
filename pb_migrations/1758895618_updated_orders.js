/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2245608546",
    "max": null,
    "min": 1,
    "name": "count",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // remove field
  collection.fields.removeById("number2245608546")

  return app.save(collection)
})
