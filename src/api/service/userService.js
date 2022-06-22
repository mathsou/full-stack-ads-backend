const userRepository = require('../repository/userRepository');
const { createUserValidator, updateUserValidator, loginValidator } = require('../validators/userValidator');
const md5 = require('md5');
const jwt = require('../middlewares/jwt');

module.exports = {
    async saveUser(body) {
        try {
            const validatedResult = createUserValidator(body);
            const userAlreadyExists = await userRepository.findUserByUsername(validatedResult.username);
            if(!userAlreadyExists.length){
                validatedResult.password =md5(validatedResult.password);
                const createdUser = await userRepository.saveUser(validatedResult)
                return { 
                    code: 200, 
                    data: { id: createdUser }, 
                    msg: "Usuário criado com sucesso!" 
                }
            }
            return {
                code: 409,
                msg: "Nome de usuário está em uso!"
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async listAllUsers(){
        try {
            const data = await userRepository.listAllUsers()
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async listOneUser(id){
        try {
            const data = await userRepository.listOneUser(id)
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async updateUser(id, user){
        try {
            const validatedResult = updateUserValidator(user);
            const userAlreadyExists = await userRepository.findUserByUsername(validatedResult.username||'');
            if(!userAlreadyExists.length || !validatedResult){
                validatedResult.password = md5(validatedResult.password);
                const updatedUser = await userRepository.updateUser(id, validatedResult)
                if(updatedUser){
                    return { 
                        code: 200, 
                        data: { id: updatedUser },
                        msg: "Usuário alterado com sucesso!",
                    }
                }
            }else {
                return {
                    code: 409,
                    msg: "Nome de usuário está em uso!"
                }
            }
            return { 
                code: 404, 
                msg: "Usuário não encontrado!",
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async deleteUser(id){
        try {
            if(await userRepository.deleteUser(id)){
                return { 
                    code: 200,
                    msg: "usuário excluído com sucesso!"
                }
            }
            return { 
                code: 404, 
                msg: "Usuário não encontrado!",
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async login(body) {
        try {
            const validatedResult = loginValidator(body);
            const user = await userRepository.findUserByUsername(validatedResult.username);
            if(user[0].password === md5(validatedResult.password)) {
                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                })
                return { 
                    code: 200, 
                    data: { token }, 
                    msg: "Login realizado com sucesso!" 
                }
            }
            return{
                code: 401,
                msg: "usuário ou senha inválido!",
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
}