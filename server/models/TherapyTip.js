const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const TherapyTipSchema = new Schema({
  tipId: { type: Types.ObjectId, default: new mongoose.Types.ObjectId() }, // Unique identifier for the therapy tip
  userId: { type: Types.ObjectId, ref: 'User', required: true }, // Reference to the User schema for personalization
  title: { type: String, required: true }, // Title of the therapy tip
  content: { type: String, required: true }, // Main content of the therapy suggestion
  recommendationType: { type: String, required: true }, // Type of recommendation (e.g., "stress-relief", "mindfulness")
  generatedByAI: { type: Boolean, default: false }, // Flag to indicate if generated by AI/ML
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the therapy tip was created
});

module.exports = mongoose.model('TherapyTip', TherapyTipSchema);
