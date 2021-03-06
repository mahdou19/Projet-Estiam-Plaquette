const exp = require("express")
require ('dotenv').config({path: './config/.env'})
require("./config/constant")
const { connect } = require('mongoose')
const { success, error } = require('consola')
const bp= require("body-parser")
const cors = require("cors")
const passport = require("passport")


const { DB, PORT } = require('./config/constant')

const app = exp()

app.use(cors());
app.use(bp.json())
app.use(passport.initialize())

require('./middlewares/passport')(passport)


app.use('/api/users', require('./routes/user.routes'))
app.use('/api/programs', require('./routes/program.route'))
app.use('/api/campus', require('./routes/campus.route'))
app.use('/api/certification', require('./routes/certification.route'))
app.use('/api/entreprises', require('./routes/entreprise.route'))
app.use('/api/finances', require('./routes/finance.routes'))
app.use('/api/competence', require('./routes/competence.route'))

const startApp = async () => {
    try{
    await connect(DB, {})
    success({
         message: `Successfully connected with the Database \n${DB}`,
         badge: true
        })

    app.listen(PORT, () =>
         success({ message: `Server started on PORT ${PORT}`, badge: true})
         )
    } catch(err) { 
        error({ 
            message: `Unable to connect with the Database \n${err}`, 
            badge: true})
        }

        app.get("/", (req, res) => {
            res.send("Hello Worl !");
          });
          
}
startApp()