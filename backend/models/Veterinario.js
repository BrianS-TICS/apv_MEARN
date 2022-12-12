import mongoose from "mongoose";

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
        type : String
    },
    confirmado : {
        type : Boolean,
        default : false
    }
})

const Veterinario = mongoose.model("Veterinario", veterinariosSchema)
export default Veterinario