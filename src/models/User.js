import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // 'select: false' hides it by default
    workspace: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
    activeWorkspace : {type:mongoose.Schema.Types.ObjectId, ref:'Workspace'}
});

// ... after your userSchema definition ...

// Remove 'next' from the parameters entirely
userSchema.pre('save', async function () {
    // 'this' refers to the user document
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // No next() call needed here! 
        // Mongoose sees the function is finished and continues.
    } catch (error) {
        throw error; // Mongoose will catch this and stop the save
    }
});
// ... before your export default ...

export default mongoose.model('User', userSchema);