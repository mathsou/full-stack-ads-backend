const bookRepository = require('../repository/bookRepository');
const authorRepository = require('../repository/authorRepository');
const authorBookRepository = require('../repository/authorBookRepository');
const { createBookValidator, updateBookValidator } = require('../validators/bookValidator');
const md5 = require('md5');

module.exports = {
    async saveBook(body) {
        try {
            const validatedResult = createBookValidator(body);
            const authors = await authorRepository.findAuthorByIds(validatedResult.authors);
            if (authors.length === validatedResult.authors.length) {
                let authorIdsReceived = validatedResult.authors;
                delete validatedResult.authors;
                const createdBook = await bookRepository.saveBook(validatedResult)
                authorIdsReceived.forEach((authorId) => {
                    authorBookRepository.saveAuthorBook({
                        bookId: createdBook[0],
                        authorId,
                        available: 1
                    })
                })
                return {
                    code: 200,
                    data: { id: createdBook },
                    msg: "Livro criado com sucesso!"
                }
            }
            let authorIds = authors.map(val => val.id);
            const idsNotFinded = authorIdsReceived.filter(val => !authorIds.includes(val))
            return {
                code: 200,
                msg: `Autores(as) de ids ${idsNotFinded.join(', ')} não encontrado!`
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async listAllBooks({ name, isbn }) {
        try {
            const data = await bookRepository.listAllBooks({ name, isbn })
            return {
                code: 200,
                data
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async listOneBook(id) {
        try {
            const data = await bookRepository.listOneBook(id)
            return {
                code: 200,
                data
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async updateBook(id, user) {
        try {
            const validatedResult = updateBookValidator(user);
            const authors = await authorRepository.findAuthorByIds(validatedResult.authors || ['']);
            if (authors.length === validatedResult.authors?.length || !validatedResult.authors) {
                let authorIdsReceived = [];
                if (validatedResult.authors) {
                    authorBookRepository.deleteAuthorByBookId(id)
                    authorIdsReceived = validatedResult.authors;
                    delete validatedResult.authors;
                }
                await bookRepository.updateBook(id, validatedResult);
                authorIdsReceived.forEach((authorId) => {
                    authorBookRepository.saveAuthorBook({
                        bookId: id,
                        authorId
                    })
                })
                return {
                    code: 200,
                    msg: "Livro atualizado com sucesso!"
                }

            }
            let authorIds = authors.map(val => val.id);
            const idsNotFinded = authorIdsReceived.filter(val => !authorIds.includes(val))
            return {
                code: 400,
                msg: `Autores(as) de ids ${idsNotFinded.join(', ')} não encontrado!`
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async deleteBook(id) {
        try {
            if (await bookRepository.deleteBook(id)) {
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
            return { code: 500, msg: err.message }
        }
    },
}