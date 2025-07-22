import Song from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";
import { Router } from "express";   





export const getStats = async (req, res, next) => {
    try {
        const [totalsongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist"
                    }
                },
                {
                    $count: "count",
                },
            ]),
        ]);

        res.status(200).json({message: "Statistics fetched successfully", totalsongs, totalUsers, totalAlbums, totalArtists: uniqueArtists[0]?.count || 0});

    } catch (error) {
        next(error);
    }
};

export default getStats;