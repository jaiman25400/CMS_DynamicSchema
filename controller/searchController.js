const formModel = require("../schema/formSchema").formModel;
const validateModel = require("../schema/validationSchema").validationModel;

module.exports.getAllformByName = async (req, res) => {
  try {
    const Name = req.body.search;
    console.log("nAme :", req.body.search);
    const data = await validateModel.find({ name: Name });
    const Formdata = await formModel.find({ name: Name });
    if(!data && !Formdata) {
        res.sendStatus(400)
    }
    else if(data.length > 0){
       res.send(data)
    }
    else if(Formdata.length > 0) {
        res.send(Formdata)
    }
    else{
        res.sendStatus(400)
    }
  } catch {
    res.sendStatus(500);
  }
};
