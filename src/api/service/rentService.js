const rentRepository = require('../repository/rentRepository');
const bookRepository = require('../repository/bookRepository');
const userRepository = require('../repository/userRepository');
const { createRentValidator, updateRentValidator } = require('../validators/rentValidator');
const moment = require('moment');

module.exports = {
    async rentBook(body) {
        try {
            const validatedResult = createRentValidator(body);
            const bookIdExists = await bookRepository.findBooksByIdIfNotRented(validatedResult.bookId);
            if (bookIdExists?.id) {
                const rentedBooksFromUser = await userRepository.findActiveRentsFromUser(validatedResult.userId);
                if (rentedBooksFromUser.length < 3) {
                    let returnDate = moment().add(7, 'days').format('Y-MM-DD');
                    await rentRepository.saveRent({
                        ...validatedResult,
                        returnDate
                    })
                    return {
                        code: 200,
                        data: { returnDate },
                        msg: "Retirada registrada com sucesso!"
                    }
                }
                return {
                    code: 400,
                    msg: "Limite de livros para retirada atingido, devolva um antes de retirar outro!"
                }
            }
            return {
                code: 400,
                msg: "Livro não disponível!"
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
    async returnBook(id){
        try {
            const updatedAuthor = await rentRepository.updateRent(id, {
                returnedAt: moment().format('Y-MM-DD H:mm:ss')
            })
            if(updatedAuthor){
                return { 
                    code: 200, 
                    msg: "Livro devolvido com sucesso!",
                }
            }
            return { 
                code: 404, 
                msg: "Registro de retirada não encontrada!",
            }
        } catch (err) {
            return { code: 500, msg: err.message }
        }
    },
}