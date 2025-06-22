const multer = require("multer");
const upload = multer();

const check_for_entries_in_array = (array_of_required_fields) => {
    return async (req, res, next) => {
        for (const field of array_of_required_fields){
            if(!req.body[field]){
                return res.status(400).json({
                    "msg": "please enter all the fields"
                })
            }
        }
        next();
    }
}

module.exports = {
    check_for_entries_in_array,
}