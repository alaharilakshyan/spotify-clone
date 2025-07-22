import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
}, {timestamps: true} // Automatically manage createdAt and updatedAt fields
);
export const Song = mongoose.model('Song', songSchema);

// Exporting the model allows it to be used in other parts of the application
// For example, you can import this model in your routes or controllers to interact with the songs collection in MongoDB.
export default Song;