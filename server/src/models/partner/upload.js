const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,

      required: true,
      trim: true,
    },
    mobile: {
      type: Number,

      required: true,
      trim: true,
    },
    parent_mobile: {
      type: Number,

      required: true,
      trim: true,
    },
    gender: {
      type: String,

      required: true,
      trim: true,
    },
    course: {
      type: String,

      required: true,
      trim: true,
    },
    branch: {
      type: String,

      required: true,
      trim: true,
    },
    date_docSubmision: {
      type: Date,

      required: true,
      trim: true,
    },
    lastExam_passingYear: {
      type: Date,

      required: true,
      trim: true,
    },
    team: {
      type: String,

      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
    },
    entrance_exam: {
      type: String,
      required: true,
    },
    dtenumber: {
      type: String,
      required: true,
    },
    capround: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      // required:true
    },
    erpid: {
      type: String,
      required: true,
    },
    otherUniversity: {
      type: String,
      // required: true,
    },
    admission_date: {
      type: Date,
      required: true,
    },
    tution_fees: {
      type: Number,
      required: true,
    },
    deve_fees: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    doc_cap_lett: {
      type: String,
      required: true,
    },
    stu_rec_fees: {
      type: Number,
      required: true,
    },
    balance_fees: {
      type: Number,
      required: true,
    },
    paid_fees: {
      type: Number,
      required: true,
    },
    total_fees: {
      type: Number,
      required: true,
    },
    govt_fees: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    student_fees: {
      type: Number,
      required: true,
    },
    p_id: {
      type: String,
      required: true,
    },
    documents: {
      adhar: { type: String, default: null },
      photo: { type: String, default: null },
      sign: { type: String, default: null },
      tc: { type: String, default: null },
      tenth: { type: String, default: null },

      twelfth: { type: String, default: null },

      caste: { type: String, default: null },
      ncl: { type: String, default: null },
      domicile: { type: String, default: null },

      csv: {
        type: String,
        default: null,
      },

      cet: { type: String, default: null },
      other: { type: String, default: null },
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("upload", applySchema);
