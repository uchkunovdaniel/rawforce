/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select493011243",
    "maxSelect": 1,
    "name": "shipping_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "speedy",
      "econtAddress",
      "econtBox",
      "econtOffice"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // remove field
  collection.fields.removeById("select493011243")

  return app.save(collection)
})
