const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const { Db, Collection } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
var db;
MongoClient.connect(
  "mongodb+srv://kumoooon:1q2w3e4r@cluster0.mds9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  function (에러, client) {
    if (에러) return console.log(에러);
    db = client.db("todoapp");
    app.listen(5000, function () {
      console.log("listening on 5000");
    });
  }
);

app.get("/", (req, res) => {
  res.send("힘내...!");
});
app.get("/write", (req, res) => {
  res.sendFile(__dirname + "/write.html");
});

app.post("/add", function (요청, 응답) {
  db.collection("counter").findOne(
    { name: "게시물 개수" },
    function (에러, 결과) {
      var 총게시물갯수 = 결과.totalPost;

      db.collection("post").insertOne(
        { _id: 총게시물갯수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date },
        function (에러, 결과) {
          db.collection("counter").updateOne(
            { name: "게시물 개수" },
            { $inc: { totalPost: 1 } },
            function (에러, 결과) {
              if (에러) {
                return console.log(에러);
              }
              응답.send("전송완료");
            }
          );
        }
      );
    }
  );
});
app.get("/list", function (요청, 응답) {
  db.collection("post")
    .find()
    .toArray(function (에러, 결과) {
      응답.render("list.ejs", { posts: 결과 });
    });
});
app.delete("/");

/*postgresql rest api...!*/
