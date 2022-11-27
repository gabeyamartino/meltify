const mongoose = require("mongoose");
mongoose.connect('mongodb://0.0.0.0/songList')
.then(() => console.log('connected'))
.catch((err) => console.log(err));

const songListSchema = new mongoose.Schema({
  songName: String
});

const SongList = mongoose.model('SongList', songListSchema);

function save (data) {
  const doc = new SongList(data);
  return doc.save();
};

module.exports.save = save;