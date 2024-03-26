let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

//Student model
let studentSchema = require("../models/Student");

//Create Student
router.route("/create-student").post(async (req, res, next) => {
  //Old version Not Work In Current
  /*   studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  }); */

  //New version
  try {
    const data = await studentSchema.create(req.body);
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

//Read Students
router.route("/").get(async (req, res) => {
  //Old version Not Work In Current
  /* studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  }); */

  //New version
  try {
    const data = await studentSchema.find({});
    res.send(data);
  } catch (err) {
    throw err;
  }
});

//Get single student
router.route("/edit-student/:id").get(async (req, res) => {
  /*   studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  }); */

  try {
    const student = await studentSchema.findById(req.params.id).exec();
    res.json(student);
  } catch (error) {
    next(error);
  }
});

//Update student
router.route("/update-student/:id").put(async (req, res, next) => {
  /*  studentSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully");
      }
    }
  ); */
  try {
    const updatedStudent = await studentSchema
      .findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // เพื่อให้คืนค่าข้อมูลหลังจากการอัปเดต
      )
      .exec();

    res.json(updatedStudent);
    console.log("Student updated successfully");
  } catch (error) {
    next(error);
    console.error(error);
  }
});

//Delete student
router.route("/delete-student/:id").delete(async (req, res, next) => {
 /*  studentSchema.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  }); */

  try {
    const deletedStudent = await studentSchema.findByIdAndDelete(req.params.id).exec();

    res.status(200).json({ msg: deletedStudent });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
