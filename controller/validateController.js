const validateModel = require("../schema/validationSchema").validationModel;
const formModel = require("../schema/formSchema").formModel;

module.exports.addvalidateData = async (req, res) => {
  const formName = req.body.formSelected;
  const formId = formModel._id;
  const validationSchema = req.body.data;
  const name = req.body.title.formTitle;
  console.log("Form Doc req :", req.body);

  await validateModel.create({
    formName,
    form: formId,
    validationSchema,
    name,
  });
  res.send("Document Created SuccesFully");
};

module.exports.readValidateByFormName = async (req, res) => {
  try {
    const Name = req.params.Name;
    console.log("nAme :", Name);
    const data = await validateModel.find({ formName: Name });
    if (!data) {
      res.sendStatus(404);
    }
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};
