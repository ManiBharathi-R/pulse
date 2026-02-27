import mongoose from "mongoose";

export const settingSchema = new mongoose.Schema({

    isPrivate: {
        type: Boolean,
        default:false
    },
    theme:{
        type:String,
        default: 'light'
    }
},{_id:false});

export const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Workspace name is required'],
        trim:true
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    settings:{
        type:settingSchema,
        default: () => ({})
    }
},{timestamps : true});

workspaceSchema.pre('save', function(next) {
    if(!this.slug && this.name) {
        this.slug = this.name
        .toLowerCase()
        .replace(/[a-z0-9]/g, '-')
        .replace(/-+/g, '-');
    }
    next();
})

