const authService = require("./authService");

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({

                success: false,

                message: "Username and Password are required"

            });

        }

        const result = await authService.login(username, password);

        if (!result.success) {

            return res.status(401).json(result);

        }

        return res.status(200).json(result);

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {

    login

};