const userModal = require("../models/userModel");


const register = async (req, res) => {
    const { name, email, password } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    console.log(image)
    try {
        if (await userModal.findOne({ email })) {
            return res.status(400).json({ error: 'User exists' });
        }
        const user = new userModal({ name, email, password, image: image });
        console.log(user)
        await user.save();
        return res.status(201).json({
            status: "success",
            msg: "User upload successfully",
            data: user
        });
    } catch (error) {
        console.log(`error is`, error.response)
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong",
            error: error
        })
    }
};

const allUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log(page)
        console.log(limit)
        const skip = (page - 1) * limit
        const totalItems = await userModal.countDocuments();

        const items = await userModal.find().skip(skip).limit(limit);

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems,
            items
        });


    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Something went wrong",
            error: error
        });
    }
};





module.exports = {
    register,
    allUser
}