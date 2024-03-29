const fs = require("fs");
const upload = require("../../models/partner/upload");
const csv = require("csv-parser");
const agent = require("../../models/partner/agent");
exports.uploadProductsFromCSV = (req, res) => {
  // console.log(req.params);
  try {
    const csvData = [];
    console.log(req.file);
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        csvData.push(row);
      })
      .on("end", async () => {
        const savedProducts = [];

        for (const row of csvData) {
          // console.log(row);

          if (
            !row.BusinessName ||
            !row.Address ||
            !row.Mobile ||
            !row.Pincode ||
            !row.City ||
            !row.State ||
            !row.Category ||
            !row.Subcategory ||
            !row.LeadStatus ||
            !row.Status
          ) {
            return res.status(400).json({
              status: "error",
              message: "Data validation failed for a row.",
            });
          }

          const product = {
            businessName: row.BusinessName,
            address: row.Address,
            mobile: row.Mobile,
            pincode: row.Pincode,
            city: row.City,
            state: row.State,
            category: row.Category,
            subcategory: row.Subcategory,
            leadStatus: row.LeadStatus,
            status: row.Status,
            p_id: req.params.id,
          };
          // console.log(product);
          // Save the product one at a time
          const savedProduct = await upload.create(product);
          if (savedProduct) {
            savedProducts.push(savedProduct);
          }
        }
        // console.log(savedProducts.length);
        // Send the response after processing all rows
        if (savedProducts.length > 0) {
          res.status(200).json({
            data: { savedProducts },
            status: "success",
            message: "Data uploaded successfully",
          });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.uploadShopData = async (req, res) => {
  try {
    // console.log(req.params);
    // const { p_id } = req.params.id;
    const {
      candidateName,
      mobile,
      parent_mobile,
      gender,
      course,
      branch,
      date_docSubmision,
      lastExam_passingYear,
      team,
      source,
      source_id,
      // entrance_exam,
      // dtenumber,
      // capround,
      // erpid,
      // admission_date,
      // tution_fees,
      // deve_fees,
      // total_fees,
      // govt_fees,
      // discount,
      // student_fees,
      // paid_fees,
      // balance_fees,
      // doc_cap_lett,
      category,
      // stu_rec_fees,
      p_id,
    } = req.body;
    const university = req.body.university || req.body.otherUniversity;
    // let documents = [];
    // console.log(req.body);

    // if (req.files && req.files.length > 0) {
    //   documents = req.files.map((file) => {
    //     return { img: file.filename };
    //   });
    // }
    const existingApplication = await upload
      .findOne({ mobile: req.body.mobile })
      .exec();
    if (existingApplication) {
      return res.status(400).json({ message: "Same Application Already Exist" });
    }

    const parentMobileValue = parent_mobile !== undefined ? Number(parent_mobile) : "Not Present";

    const student = new upload({
      candidateName,
      mobile,
      parentMobileValue,
      gender,
      course,
      branch,
      date_docSubmision,
      lastExam_passingYear,
      team,
      source,
      source_id,
      // entrance_exam,
      // dtenumber,
      // capround,
      // erpid,
      // university,
      // admission_date,
      // tution_fees,
      // deve_fees,
      // total_fees,
      // govt_fees,
      // discount,
      // student_fees,
      // paid_fees,
      // balance_fees,
      // doc_cap_lett,
      category,
      // stu_rec_fees,
      // documents,
      p_id,
    });

    const response = await student.save();
    if (response) {
      return res.status(200).json({
        data: response,
        status: "success",
        message: "Data uploaded successfully",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};  

exports.getEditorAdmission = async (req, res) => {
  try {
    const response = await upload.find();
    if (response.length > 0) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.getaAgentSource = async (req, res) => {
  try {
    const response = await agent.find();
    if (response) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
    // console.log(req.params);
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};
