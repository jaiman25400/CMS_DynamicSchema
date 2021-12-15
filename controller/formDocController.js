const formDocModel = require("../schema/formDocSchema").formDocModel
const formModel = require("../schema/formSchema").formModel;



module.exports.showFormByItsName = async (req,res) => {
  const formName = req.params.formName
  console.log('form Name :',formName)
  var data = await formDocModel.find({
    formName: formName
  })
  res.send(data)
}

module.exports.showFormDocById = async (req,res) => {
  console.log('id',req.body)
  var data = await formDocModel.find({ _id: req.body.id})
  res.send(data)
}

module.exports.addFormData = async (req, res) => {
    const formName = req.params.formName    
    const data = req.body;
    console.log("Form Doc req :", req,req.body,formName);
    const form = await formModel.findOne({ name: formName });
    const formId = form._id
    console.log('iddddd ',form._id)
    // const modelId = req.model_id;
    const path = null;
    const media = req.body.MediaName[0]
    console.log('media',media)
    if (!req.files) {
      await formDocModel.create({ formName, form: formId, data, fileName: path,mediaName : media });
      res.send("Document Created SuccesFully");
    } else {
      const file = req.files.file;
      const path = file.name;

      file.mv(`public/formDoc/${file.name}`, (err) => {
        if (err) {
          console.log("erre", err);
          return res.status(500).send(err);
        } else {
          console.log("save");
        }
      });
      await formDocModel.create({ formName, form: formId, data, fileName: path });
      res.send( "Document Created SuccesFully");
    }
  };