const authorRepository = require('../repository/authorRepository');
const { createAuthorValidator, updateAuthorValidator } = require('../validators/authorValidator');
const md5 = require('md5');

module.exports = {
    async saveAuthor(body) {
        try {
            const validatedResult = createAuthorValidator(body);
            const createdAuthor = await authorRepository.saveAuthor(validatedResult)
            return { 
                code: 200, 
                data: { id: createdAuthor }, 
                msg: "Autor(a) criado com sucesso!" 
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async listAllAuthors(){
        try {
            const data = await authorRepository.listAllAuthors()
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async listOneAuthor(id){
        try {
            const data = await authorRepository.listOneAuthor(id)
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async updateAuthor(id, user){
        try {
            const validatedResult = updateAuthorValidator(user);
            const updatedAuthor = await authorRepository.updateAuthor(id, validatedResult)
            if(updatedAuthor){
                return { 
                    code: 200, 
                    data: { id: updatedAuthor },
                    msg: "Autor(a) alterado com sucesso!",
                }
            }
            return { 
                code: 404, 
                msg: "Autor(a) não encontrado!",
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async deleteAuthor(id){
        try {
            if(await authorRepository.deleteAuthor(id)){
                return { 
                    code: 200, 
                    msg: "Autor(a) excluído com sucesso!"
                }
            }
            return { 
                code: 404, 
                msg: "Autor(a) não encontrado!",
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
}