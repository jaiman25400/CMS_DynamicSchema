const mediaModel = require("../schema/mediaSchema").mediaModel;

module.exports.getAllMedia = async (req, res) => {
  const Forms = await mediaModel.find({});
  res.send(Forms);
};

module.exports.getMediaByNameAndId = async (req, res) => {
  const name = req.params.name;
  console.log("Name:", name);
  const data = await mediaModel.findOne({ name: name });
  console.log("dataaa :", data);
  res.send(data);
};

module.exports.addMediaData = async (req, res) => {
  console.log("Media", req);
  const data = req.body;
  const name = req.body.Title;
  if (!req.files) {
    res.send("Enter File Name");
    res.status(500);
  } else {
    const file = req.files.file;
    const fileName = file.name;
    console.log("file", file);
    console.log("file Name", fileName);
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        console.log('File Name is :',file[i].name, i,file[i])
        file[i].mv(`public/Media/${file[i].name}`, (err) => {
          if (err) {
            console.log("erre", err);
            return res.status(500).send(err);
          } else {
            console.log("save");
          }
        });
        await mediaModel.create({
          mediaSchema: data,
          fileName: file[i].name,
          name: file[i].name,
        });
      }

      res.send("Document Created SuccesFully");
    } else {
      file.mv(`public/Media/${file.name}`, (err) => {
        if (err) {
          console.log("erre", err);
          return res.status(500).send(err);
        } else {
          console.log("save");
        }
      });
      await mediaModel.create({
        mediaSchema: data,
        fileName: fileName,
        name: name,
      });
      res.send("Document Created SuccesFully");
    }
  }
};
