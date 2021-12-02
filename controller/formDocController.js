const formDocModel = require("../schema/formDocSchema").formDocModel
const formModel = require("../schema/formSchema").formModel;

module.exports.addFormData = async (req, res) => {
    const formName = req.params.formName
    const formId = req.params.formId
    const data = req.body;
    console.log("Form Doc req :", req,req.body,formName);
    const form = await formModel.findOne({ name: formName });
    console.log('iddddd ',form._id)
    // const modelId = req.model_id;
    const path = null;

    if (!req.files) {
      await formDocModel.create({ formName, form: formId, data, fileName: path });
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