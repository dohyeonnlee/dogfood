const express = require('express');
const router = express.Router();
const multer = require('multer');


//back -> front

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: (req, file, cb) => { //어디에 파일이 저장되는지를 알려줌
        cb(null, 'uploads/') //모든 파일이 uploads/로 저장
    },
    filename: (req, file, cb) => { //어떤 이름으로 저장
        cb(null, `${Date.now()}_${file.originalname}`) // 날짜+파일이름
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", auth, (req, res) => {

    //가져온 이미지를 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        } //에러없으면 파일 저장 성공
        return res.json({ 
            success: true, 
            image: res.req.file.path, //어디에 파일있는지
            fileName: res.req.file.filename //파일 이름
        })
    })

});

module.exports = router;
