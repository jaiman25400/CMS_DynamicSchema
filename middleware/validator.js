const validationResult = require('express-validator').validationResult
module.exports.validatonCheck = (req, res, next) => {
    const errors = validationResult(req);
    console.log('vali check')
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


module.exports.checkmodelName = async (req, res, next) => {
    const name = req.body.name
    if (name.includes(" ") || name.includes("/")) {
        res.Status(201).send("Name Does not contain spaces or slash");
    }
    const check = await modelModel.findOne({ name: name })
    if (check === null || check === "null") {
        next()
    } else {
        res.status(201).send("Already Exist");
    }
}

module.exports.checkModelSchema = async (req, res, next) => {
    const modelSchema = req.body.modelSchema
    const ajv = new Ajv();
    try {
        const schemaObj = JSON.parse(modelSchema);
        const isValid = await ajv.validateSchema(schemaObj);
        if (!isValid) throw Error();
        ajv.compile(schemaObj);
        next()
    } catch {
        res.status(201).send("Invalid Schema");
    }
}

module.exports.checkDocSchema = async (req, res, next) => {
    try {
        const name = req.params.modelName
        const model = await modelModel.findOne({ name: name });
        if (!model) {
            res.sendStatus(404);
            return;
        }
        const ajv = new Ajv();
        const validator = ajv.compile(model.modelSchema);
        const isValid = validator(JSON.parse(req.body.data));
        if (!isValid) {
            console.error(validator.errors);
            res.sendStatus(403);
            return;
        }
        req.model_id = model._id
        next()
    } catch (e) {
        res.sendStatus(500);
    }
}
