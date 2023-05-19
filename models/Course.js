const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

// mongoose middleware'ı
// urlde slug için slugify paketini kullandık ve schemamız veritabanına kaydedilmeden önce name alanında slug oluşturulup öyle kaydediliyor.
CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,// küçük karakter olsun
    strict: true,// karakterleri kaldır 
  });
  next();
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
