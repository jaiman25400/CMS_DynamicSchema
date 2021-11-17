const docsModel = require("../schema/docsSchema").docsModel;

module.exports.getDocByModelName = async (req, res) => {
    try {
        const modelName = req.params.modelName
        const data = await docsModel.find({ modelName: modelName });
        console.log(data)
        console.log(modelName)
        res.send(data)
    } catch {
        res.sendStatus(500);
    }
}

module.exports.addData = async (req, res) => {
    console.log(req.body)
    const modelName = req.params.modelName
    const modelId = req.body.model_id
    const data = req.body.data
    console.log(modelName,modelId,data)
    await docsModel.create({ modelName, model: modelId, data });
    res.send("Document Created SuccesFully")
};

module.exports.updateData = async (req, res) => {
    const docId = req.params.docId
    const data = req.body.data
    await docsModel.findByIdAndUpdate(
        { _id: docId },
        { $set: { "data": data } }
    );
    res.send("Document Updated Successfully")
};

module.exports.deleteData = async (req, res) => {
    const docId = req.params.docId
    await docsModel.findByIdAndDelete(docId);
    res.send("Document Deleted Sucessfully")
}
