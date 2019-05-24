const Event = require("../models/Event");
const List = require("../models/List");
const GPS = require("../models/GPS");
const fs = require('fs');
// const M11 = require("../../M11Triplebank.geojson");


exports.listAllLists = (req, res) => {
  // Article.$where('this.firstname === this.lastname')
  List.find({}, (err, article) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(article);
  });
};

exports.listAllBlocks = (req, res) => {
var block;
fs.readFile('D:/home/site/wwwroot/api/controllers/GeojsonBlocks/PRWNZVineyards.geojson', "utf8", function(err, Blk){
  if(err){
  res.status(500).send(err);
  }
  console.log(Blk);

  // let bufferOriginal = Buffer.from(JSON.parse(Blk).data);
  // console.log(bufferOriginal);
  // jsonOut = bufferOriginal.toString('utf8')
  res.status(200).json(Blk);
})
  // var a =  "get this working";
  
  
  // Article.$where('this.firstname === this.lastname')
  // Blocks.find({}, (err, article) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   res.status(200).json(article);
  // });
};

exports.listAllEvents = (req, res) => {
  // Article.$where('this.firstname === this.lastname')
  Event.find({}, (err, article) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(article);
  });

};

exports.listAllGPS = (req, res) => {
  // Article.$where('this.firstname === this.lastname')
  GPS.find({}, (err, article) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(article);
  });

};

exports.createNewEvent = (req, res) => {
  let newEvent = new Event(req.body);
  newEvent.save((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(event);
  });
};

exports.createNewGPS = (req, res) => {
  let newGPS = new GPS(req.body);
  newGPS.save((err, event) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(event);
  });
};

exports.updateArticle = (req, res) => {
  Event.findById(
    { _id: req.params.eventid }, (err, item) => {
          item.set(req.body);
      
      item.save((err, article) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(article);
    });
    })}
// exports.updateArticle = (req, res) => {
//   Event.findOneAndUpdate(
//     { _id: req.params.eventid },
//     req.body,
//     { new: true },
//     (err, article) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//       res.status(200).json(article);
//     }
//   );
// };

exports.readArticle = (req, res) => {
  console.log(req.params.eventid);
  Event.findById(req.params.eventid, (err, article) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(article);
  });
};
