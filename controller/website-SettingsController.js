import { webSetting } from "../model/Website-settings.js";


export const deletewebsetting = async(req,res) =>{
    const id = req.params.id 
    try {
        const deleted = await webSetting.findByIdAndDelete(id);
        if(!deleted){
            return res.json({message:"items  doesn't exist"})
        }
            
        res.redirect('/web-setting/view-setting')
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const update =  async (req, res) => {
    try {
        const id = req.params.id;
        const websetting = await webSetting.findById(id);
        res.render('createWebsetting', { websetting });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};
export const presentWebsetting = async(req,res) =>{
    return res.render('createWebsetting')
}
export const createwebsiteSetting = async (req,res)=>{
  
    const {
        street,
        description,
        logo,
        email,
        phone,
        location,
        address
    } = req.body;

    try {
        const updateData = {
            street: street,
            description: description,
            email:email,
            address:address,
            phone:phone,
           location:location
        };
        if (req.file) {
            updateData.logo = req.file.filename;
        }
        const websiteSetting = new webSetting (updateData)
        const savedwebsiteSetting = await websiteSetting.save();

        if (!savedwebsiteSetting) {
            return res.status(400).json({ message: "cannot be created " });
          }
        res.redirect('/web-setting/view-setting')      

    } catch (error) {
        console.log(error)
    }
}

// export const updateSetting = async (req,res) =>{

// } 
export const updateSetting = async(req,res,next) =>{
    const {   
        street,
        image,
        logo,
        description,
        favicon,
        email,
        phone,
        location,
        address} = req.body;
    const {id} = req.params;
   
    try {
        const updateData = {
            street: street,
            description: description,
            email:email,
            address:address,
            phone:phone,
           location:location
        };
        if (req.file) {
            updateData.logo = req.file.filename;
        }
    const webSettings = await webSetting.findByIdAndUpdate(id,updateData)    
       const savedSetting = await webSettings.save();
    if(!savedSetting){
     return res.status(500).json({message:"error while saving"});
    }

    res.redirect('/web-setting/view-setting');
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const allWebsetting = async(req,res) =>{
    let websetting;
    try {
       websetting = await webSetting.find()
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
    if(!websetting){
        return res.status(404).json({message:"noProduct"})
    }
    return res.render('web-setting',{websetting,
        title:"Setting",
    myRoute:"/web-setting/present-setting"});
}