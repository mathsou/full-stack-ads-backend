const bookRepository = require('../repository/booksRepository');
const { createBookValidator, updateBookValidator } = require('../validators/bookValidator');
const md5 = require('md5');

module.exports = {
    async saveBook(body) {
        try {
            const validatedResult = createBookValidator(body);
            const createdBook = await bookRepository.saveBook(validatedResult)
            return { 
                code: 200, 
                data: { id: createdBook }, 
                msg: "Livro criado com sucesso!" 
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async listAllBooks(){
        try {
            const data = await bookRepository.listAllBooks()
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async listOneBook(id){
        try {
            const data = await bookRepository.listOneBook(id)
            return { 
                code: 200, 
                data
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async updateBook(id, user){
        try {
            const validatedResult = updateBookValidator(user);
            const updatedBook = await bookRepository.updateBook(id, validatedResult)
            if(updatedBook){
                return { 
                    code: 200, 
                    data: { id: updatedBook },
                    msg: "Livro alterado com sucesso!",
                }
            }
            return { 
                code: 404, 
                msg: "Livro não encontrado!",
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
    async deleteBook(id){
        try {
            if(await bookRepository.deleteBook(id)){
                return { 
                    code: 200, 
                    data,
                    msg: "Livro excluído com sucesso!"
                }
            }
            return { 
                code: 404, 
                msg: "Livro não encontrado!",
            }
        } catch (err) {
            return { code: err.code || 500, msg: err.message }
        }
    },
}