/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select493011243",
    "maxSelect": 1,
    "name": "shipping_type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "speedy",
      "econtAddress",
      "econtBox",
      "econtOffice",
      "address"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1047473523")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select493011243",
    "maxSelect": 1,
    "name": "shipping_type",
    "presentable": false,
    "required": true,
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
})
