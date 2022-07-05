let express = require("express");
let router = express.Router();

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });
const client = new AWS.DynamoDB.DocumentClient();

const tableName = "Dessert";
/**
 * GET: /pics get picList
 */
router.get("/", (req, res) => {
  client
    .scan({
      TableName: tableName,
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

/**
 * GET: /dessert/:dessertId getDessert
 * @param id dessertId
 */
router.get("/:id", (req, res) => {
  // dessertId check
  client
    .get({
      TableName: tableName,
      Key: {
        id: req.params.id,
      },
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

/**
 * POST: /pic add pic
 * @param {req.body} { id: id, name: name, calories: calories, fat: fat, carbs:carbs,protein:protein}
 */
router.post("/addDessert", (req, res) => {
  client
    .put({
      TableName: tableName,
      Item: req.body,
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

router.post("/updateDessert", (req, res) => {
  client
    .update({
      TableName: tableName,
      Key: {
        id: req.body.id,
      },
      Item: req.body,
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

/**
 * Delete: /dessert/:dessertId deleteDessert
 * @param id dessertId
 */
router.delete("/:id", (req, res) => {
  client
    .delete({
      TableName: tableName,
      Key: {
        id: req.params.id,
      },
    })
    .promise()
    .then((result) => res.json(result))
    .catch((e) => res.status(422).json({ errors: e }));
});

module.exports = router;
