module.exports = (req, res, next) =>{
    const userID = req.session.userID;
    if(userID){
        return res.redirect('/');
    }
    next();
}