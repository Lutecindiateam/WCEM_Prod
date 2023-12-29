exports.uploadDocument = (req, res) => {
  try {
    console.log(req.file);
    return res.status(200).json({ message: "uploaded successfully" });
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};
