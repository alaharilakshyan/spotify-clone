import { User} from "../models/user.model.js";
// This function handles the authentication callback from Clerk

export const authCallback = async (req, res) => {
    try{
        const { id, firstName, lastName, imageUrl } = req.body;

        //to check if user already exists
        const user = await User.findOne({clerkId: id});

        if(!user){
            //signup user
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
            });
        }

        res.status(200).send({ success:true});
    }
    catch (error) {
        console.log("Error in auth callback", error);
        // Handle the error appropriately
        // You might want to log it or send a more specific error message
        res.status(500).send({ Message: "Internal Server Error", error });
    }
};