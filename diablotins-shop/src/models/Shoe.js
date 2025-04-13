const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  size: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  sku: {
    type: String,
    unique: true
  }
});

const shoeSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  sizes: [sizeSchema],
  category: {
    type: String,
    enum: ['bébé', 'enfant', 'ado'],
    required: true
  },
  gender: {
    type: String,
    enum: ['garçon', 'fille', 'unisexe'],
    required: true
  },
  season: {
    type: String,
    enum: ['printemps', 'été', 'automne', 'hiver', 'toute saison'],
    required: true
  },
  isNew: {
    type: Boolean,
    default: false
  },
  reduction: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  // Champs pour e-commerce
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  meta: {
    title: String,
    description: String,
    keywords: [String]
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour mettre à jour updatedAt
shoeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Méthode pour calculer la note moyenne
shoeSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.averageRating = sum / this.reviews.length;
  return this.averageRating;
};

module.exports = mongoose.model('Shoe', shoeSchema); 