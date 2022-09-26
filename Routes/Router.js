var express = require('express');
var router = express.Router();
var mycontroller = require('../Controller/Controller');



router.post('/regisForm', mycontroller.register_with_password_form);
router.post('/loginForm', mycontroller.loginForm);
router.post('/message', mycontroller.message);
router.post('/package', mycontroller.package);
router.post('/hotel', mycontroller.hotel);
router.get('/upload_package', mycontroller.upload_package);
router.get('/upload_hotel', mycontroller.upload_hotel);
router.get('/user_details', mycontroller.user_details);
router.get('/hotel_details', mycontroller.hotel_details);
router.get('/message_details', mycontroller.message_details);
router.get('/filter_user_details', mycontroller.filter_user_details);
router.post('/delete_user', mycontroller.delete_user);
router.post('/delete_hotel', mycontroller.delete_hotel);
router.post('/delete_package', mycontroller.delete_package);
router.post('/booked_hotel', mycontroller.booked_hotel);
router.get('/booked_hotel_details', mycontroller.booked_hotel_details);
router.post('/booked_package', mycontroller.booked_package);
router.get('/booked_package_details', mycontroller.booked_package_details);
router.post('/updatePassword', mycontroller.updatePassword);
router.post('/update_hotel', mycontroller.update_hotel);
router.post('/update_package', mycontroller.update_package);
router.post('/update_message', mycontroller.update_message);
router.post('/update_mobile', mycontroller.update_mobile);
router.post('/update_hotelwishlist', mycontroller.update_hotelwishlist);
router.post('/picture', mycontroller.picture);
router.post('/show_picture', mycontroller.show_picture);









module.exports = router;