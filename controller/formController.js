const formModel = require("../schema/formSchema").formModel;

module.exports.getAllForms = async (req, res) => {
    const Forms = await formModel.find({});
    res.send(Forms)
};

module.exports.getformByName = async (req, res) => {
  try {
    const Name = req.params.Name;
    console.log("nAme :", Name);
    const data = await formModel.find({ name: Name });
    if (!data) {
      res.sendStatus(404);
    } 
      res.send(data);
  
  } catch {
    res.sendStatus(500);
  }
};

module.exports.createForm = async (req, res) => {
  console.log("Req :", req);
  console.log("parse body :", req.body);
  const name = req.body.title.formTitle;
  const formSchema = req.body.data;

  const doc = await formModel.create({ name, formSchema: formSchema });
  await doc.save();
  res.send("Created form Successfully");
};

module.exports.updateForm = async (req, res) => {
    console.log("req up", req);
    const formId = req.params.formId;
    const data = req.body;
    console.log("req up", req,req.body,formId);

      await formModel.findByIdAndUpdate(
        { _id: formId },
        { $set: { formSchema: data} }
      )
  
    res.send("Document Updated Successfully");
  };

module.exports.deleteForm = async (req, res) => {
    const formId = req.params.formId
    await formModel.findByIdAndDelete(formId);
    res.send("Form Deleted Sucessfully")
}
