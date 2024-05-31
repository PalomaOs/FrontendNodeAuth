const Refresca = async (req, res) => {
    //revisa si el servidor nos envio un nuevo token
    const token = res.headers.get('set-authorization')
    if(!token)
        return

    //obtiene el token y lo refreca en el cliente
    req.session.user.jwt = token 
}

module.exports = Refresca