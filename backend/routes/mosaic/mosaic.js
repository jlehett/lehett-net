const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;
const base64Img = require('base64-img');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 100000000},
}).single('img');

// API that will generate the requested mosaic given the
// image and the Bing search query.
router.post('/generate-mosaic/', function(req, res, next) {
    upload(req, res, (err) => {
        req.connection.setTimeout(60*60*1000);
        const uploadedImgPath = req.file.path;
        const randomKey = crypto.randomBytes(20).toString('hex');
        const rootFilepath = 'bin/mosaic/public/' + randomKey;
        const ls = spawn(
            'python3.7',
            [
                'bin/mosaic/mosaic-generation.py',
                req.body.bingSearch,
                uploadedImgPath,
                randomKey,
                req.body.numImages,
                req.body.tilingImageScale,
                req.body.outputImageScale,
            ]
        );
        ls.on('close', () => {
            let error = false;
            if (ls.exitCode) {
                error = true;
            }
            base64Img.base64(
                path.join(__dirname, '../../', rootFilepath, '/output.png'),
                function(err, data) {
                    res.json({
                        error: !!error || !!err,
                        data,
                    });
                    rimraf(rootFilepath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Deleted working folder...');
                        }
                    });
                    rimraf(uploadedImgPath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Deleted uploaded image...');
                        }
                    })
                }
            );
        });
        ls.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
        ls.stderr.on('data', (data) => {
            console.log(`${data}`);
        });
    });
});

module.exports = router;