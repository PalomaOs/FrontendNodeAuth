const errorLoger = (err, req, res, next) => {
    //aquí se puede enviar el error a un archivo de texto
    console.log(err.message)
    next(err)
}

module.exports=errorLoger