const userRepository = require('../repository/userRepository');
const { createUserValidator, updateUserValidator } = require('../validators/userValidator');
const md5 = require('md5');

module.exports = {
    async saveUser(body) {
        try {
            const validatedResult = createUserValidator(body);
            const userAlreadyExists = userRepository.findUserByEmail(body.email);
            if(!userAlreadyExists){
                const createdUser = await userRepository.saveUser(validatedResult)
                return { 
                    code: 200, 
                    data: { id: createdUser }, 
                    msg: "Usuário criado com sucesso!" 
                }
            }
            return {
                code: 409,
                msg: "Email já cadastrado!"
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
            const updatedUser = await userRepository.updateUser(id, validatedResult)
            if(updatedUser){
                return { 
                    code: 200, 
                    data: { id: updatedUser },
                    msg: "Usuário alterado com sucesso!",
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
                    data,
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
}