import Song from "#models/song.model";
import {Album} from "#models/album.model";
import cloudinary from "../lib/cloudinary.js"

const uploadToCloudinary = async(file) => {
    try{
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",
      })
      return result.secure_url;
    }catch(error){
      console.log("Error in uploadToCloudinary", error);
      throw new Error("Error uploading to cloudinary");
    }
};

//creating Song
export const createSong = async (req, res, next) => {
  try {
    if(!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }


    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;


    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null
    });

    await song.save();

    if(albumId){
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (error) {
    console.log("Error in creating song:", error);
      next(error);
  }

};

//deleting Song
export const deleteSong = async(req, res, next) => {
  try{
    const {id}= req.params
    
    // Use findByIdAndDelete to find and delete the song in one go.
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    
    // if song belongs to an album, update the album's song array
    if(song.albumId){
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    res.status(200).json({message: "Song deleted successfully"});


  }catch(error){
    console.log("Error in deleting Song", error);
    next(error);
  }
}

//creating an Album
export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};


//deleting the album
 export const deleteAlbum = async(req, res, next) => {

  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({message: "Album deleted successfully"});
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
    
  }
 }


 //check admin & user login
 export const checkAdmin = async(req, res, next) => {
  req.status(200).json({ admin: true });
 }