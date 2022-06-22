const publisherRepository = require('../repository/publisherRepository');
const { createPublisherValidator, updatePublisherValidator } = require('../validators/publisherValidator');
const md5 = require('md5');

module.exports = {
    async savePublisher(body) {
        try {
            const validatedResult = createPublisherValidator(body);
            const createdPublisher = await publisherRepository.savePublisher(validatedResult)
            return { 
                code: 200, 
                data: { id: createdPublisher }, 
                msg: "Editora criada com sucesso!" 
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async listAllPublishers(){
        try {
            const data = await publisherRepository.listAllPublishers()
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async listOnePublisher(id){
        try {
            const data = await publisherRepository.listOnePublisher(id)
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async updatePublisher(id, user){
        try {
            const validatedResult = updatePublisherValidator(user);
            const updatedPublisher = await publisherRepository.updatePublisher(id, validatedResult)
            if(updatedPublisher){
                return { 
                    code: 200, 
                    data: { id: updatedPublisher },
                    msg: "Editora alterada com sucesso!",
                }
            }
            return { 
                code: 404, 
                msg: "Editora não encontrado!",
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async deletePublisher(id){
        try {
            if(await publisherRepository.deletePublisher(id)){
                return { 
                    code: 200, 
                    data,
                    msg: "Editora excluída com sucesso!"
                }
            }
            return { 
                code: 404, 
                msg: "Editora não encontrado!",
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
}