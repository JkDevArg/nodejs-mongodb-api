export const register = (req, res) => {
    console.log(req.body);
    res.json({ok : 'Registro'});
}

export const login = (req, res) => {
    res.json({ok : 'Login'});
}