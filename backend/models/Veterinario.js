import mongoose from "mongoose";
import generadId from "../helpers/generarId.js";
import bcrypt from 'bcrypt'
const veterinariosSchema = mongoose.Schema({
    nombre : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required: true,
        unique : true,
        trim: true
    },
    telefono : {
        type : String,
        default : null,
        trum : true
    },
    web : {
        type : String,
        default : null
    },
    token : {
        type : String,
        default : generadId()
    },
    confirmado : {
        type : Boolean,
        default : false
    }
})

veterinariosSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

veterinariosSchema.methods.comprobarPassword = async function(passwordFormulario, passwordHash){
    return await bcrypt.compare(passwordFormulario,this.password)
}

const Veterinario = mongoose.model("Veterinario", veterinariosSchema)
export default Veterinario