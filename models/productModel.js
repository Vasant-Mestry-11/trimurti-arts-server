import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'Category'
  },
  quantity: {
    type: Number,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    type: String,
  }
}, { timestamps: true })

export default mongoose.model("Products", productSchema)