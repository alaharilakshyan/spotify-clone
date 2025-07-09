import  mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        releaseYear: {
            type: Number,
            required: true,
        },
        songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}], // Array of song IDs
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
)

export const Album = mongoose.model('Album', albumSchema);
// Exporting the model allows it to be used in other parts of the application