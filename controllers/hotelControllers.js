import hotelModel from '../models/hotelModel.js';
import { creatError } from '../utils/error.js';

class hotelControllers {
  // createDoc
  static createDoc = async (req, res) => {
    try {
      const { name, type, city, address, distance, title, desc, cheapestPrice } = req.body;
      const doc = new hotelModel({  // Use hotelModel instead of userModel
        name: name,
        type: type,
        city: city,
        address: address,
        distance: distance,
        title: title,
        desc: desc,
        cheapestPrice: cheapestPrice,
      });

      const result = await doc.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
//===============================================
  //update
  static updateDocById = async (req, res) => {
    try {
        const id = req.params.id.trim();  
        const updateData = req.body;  

        const result = await hotelModel.findByIdAndUpdate(id, updateData);
       res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}
//==================================================
//delete

static deleteDocById= async (req, res)=>
{
    try{
        const result= await hotelModel.findByIdAndDelete(req.params.id)
        res.status(200).json(result)
    } catch(error)
     {
       res.status(500).json(error)
     }
}

//=============================================================
//get all doc/hotels

    static getAllDoc = async (req, res , next)=>
        {
           
            // const faild = true;  
        //    if (faild)
        //    return next(creatError(404, "You are not authenticated mate!"))
           
            try {
                const result = await hotelModel.find()
                // console.log(result)
                res.status(200).json(result)
            } catch(error)
            {
                 next(error)
            }
           
        }
//==================================================

}

export default hotelControllers;
