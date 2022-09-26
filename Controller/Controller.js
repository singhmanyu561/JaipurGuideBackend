var pool = require('../DB/Db');
var bcrypt = require('bcryptjs');



exports.register_with_password_form = (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log("1" + err)
            return res.status(403).send(err);
        }
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                console.log("2" + err)
                return res.status(403).send(err);
            }


            pool.query('insert into visitor(name,mobile,email,password) values ($1,$2,$3,$4) RETURNING name', [req.body.name, req.body.mobile, req.body.email, hash]).then((result) => {
    
                return res.status(200).send("Success")
            }).catch((err) => {
                console.log(err)
                return res.status(403).send(err);
            });


        });
    });

}


exports.loginForm = (req, res) => {


    pool.query("select * from visitor where email = $1", [req.body.email]).then((result) => {
       
        console.log(result)
       


        if (result.rows.length === 0) {
            return res.status(400).send("User does not exist");
        }
        if (bcrypt.compare(req.body.password, result.rows[0].password, (err, resul) => {
            if (err) {

                return res.status(403).send("Error in comparison");
            }
            if (resul) {



                return res.status(200).send("Correct password")


            }
            else {
                return res.status(400).send("Incorrect password")
            }
        }));


    }).catch((err) => {

        res.status(403).send(errormsgs.err(err));
    });


}

exports.message =(req,res)=>{
    // console.log(req.body)

    pool.query('insert into visQuery(name,email,message) values ($1,$2,$3) RETURNING name', [req.body.name, req.body.email, req.body.message]).then((result) => {
        return res.status(200).send("Message Sent")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.package = (req, res) => {
    // console.log(req.body)

    pool.query('insert into package(header,duration,inclusion,description,price,image) values ($1,$2,$3,$4,$5,$6) RETURNING header', [req.body.header, req.body.duration, req.body.inclusion,req.body.description,req.body.price,req.body.image]).then((result) => {
        return res.status(200).send("package added")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });


}

exports.hotel = (req, res) => {
    // console.log(req.body)

    pool.query('insert into hotels(name,address,price,features,types,image) values ($1,$2,$3,$4,$5,$6) RETURNING name', [req.body.name, req.body.address, req.body.price,req.body.features,req.body.types,req.body.image]).then((result) => {
        return res.status(200).send("hotel added")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.booked_hotel = (req, res) => {
    // console.log(req.body)

    pool.query('insert into booked_hotel(name,mobile,email,nationality,status,hotel,checkIn,checkOut,room,person,price,bookTime) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING name,hotel', [req.body.name, req.body.mobile, req.body.email, req.body.nationality, req.body.status, req.body.hotel, req.body.checkIn, req.body.checkOut, req.body.room, req.body.person, req.body.tPrice, req.body.bookTime]).then((result) => {
        return res.status(200).send("hotel booked successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.booked_package = (req, res) => {
    // console.log(req.body)

    pool.query('insert into booked_package(name,mobile,email,nationality,status,package,checkIn,checkOut,person,price,bookTime) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING name,package', [req.body.name, req.body.mobile, req.body.email, req.body.nationality, req.body.status, req.body.package, req.body.checkIn, req.body.checkOut, req.body.person, req.body.tPrice, req.body.bookTime]).then((result) => {
        return res.status(200).send("package booked successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.upload_package = (req, res) => {
    // console.log(req.query)

    pool.query('select * from package').then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.upload_hotel = (req, res) => {
    // console.log(req.query)

    pool.query('select * from hotels').then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.user_details = (req, res) => {
    // console.log(req.query)

    pool.query('select * from visitor').then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.hotel_details = (req, res) => {
    // console.log(req.query)

    pool.query('select * from hotels').then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.booked_hotel_details = (req, res) => {
    // console.log(req.query)

    pool.query('select * from booked_hotel').then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.booked_package_details = (req, res) => {
    // console.log(req.query)

    pool.query('select * from booked_package').then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.message_details = (req, res) => {
    // console.log(req.query)

    pool.query('select * from visquery').then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


// exports.package_details = (req, res) => {
//     console.log(req.query)

//     pool.query('select * from package').then((result) => {
//         console.log(result)
//         // console.log(typeof([result.rows]))
//         return res.status(200).send(result.rows)
//     }).catch((err) => {
//         console.log(err)
//         return res.status(403).send(err);
//     });

// }


exports.filter_user_details = (req, res) => {
    // console.log(req.query)

    pool.query('select * from visitor where email=$1',[req.query.email]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.delete_user = (req, res) => {
    // console.log(req.body)

    pool.query('delete from visitor where email=$1', [req.body.email]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("user deleted successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.delete_hotel = (req, res) => {
    // console.log(req.body)

    pool.query('delete from hotels where idnew=$1', [req.body.id]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("hotel deleted successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.delete_package = (req, res) => {
    // console.log(req.body)

    pool.query('delete from package where header=$1', [req.body.header]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("package deleted successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

//=================================================================Forgot Password==================================================

exports.updatePassword = (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log("1" + err)
            return res.status(403).send(err);
        }
        bcrypt.hash(req.body.newpass, salt, (err, hash) => {
            if (err) {
                console.log("2" + err)
                return res.status(403).send(err);
            }


            pool.query('update visitor set password=$1 where email=$2 ', [ hash,req.body.email]).then((result) => {

                return res.status(200).send("Success")
            }).catch((err) => {
                console.log(err)
                return res.status(403).send(err);
            });


        });
    });

}



exports.update_hotel = (req, res) => {
    // console.log(req.body)

    var sql = ''

    if (req.body.first === 'name') { sql = 'update hotels set name = $1 where id=$2'}
    else if (req.body.first === 'address') { sql = 'update hotels set address = $1 where id=$2' }
    else if (req.body.first === 'price') { sql = 'update hotels set price=$1 where id=$2' }
    else if (req.body.first === 'features') { sql = 'update hotels set features = $1 where id=$2' }
    else if (req.body.first === 'types') { sql = 'update hotels set types = $1 where id=$2' }
    else if (req.body.first === 'image') { sql = 'update hotels set image = $1 where id=$2' }

    // console.log(sql)

    pool.query(sql, [req.body.second,req.body.third]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("hotel edited successfully")
    }).catch((err) => {
        console.log('error',err)
        return res.status(403).send(err);
    });

}


exports.update_package = (req, res) => {
    // console.log(req.body)

    var sql = ''

    if (req.body.first === 'header') { sql = 'update package set header = $1 where id=$2' }
    else if (req.body.first === 'duration') { sql = 'update package set duration = $1 where id=$2' }
    else if (req.body.first === 'inclusion') { sql = 'update package set inclusion=$1 where id=$2' }
    else if (req.body.first === 'description') { sql = 'update package set description = $1 where id=$2' }
    else if (req.body.first === 'price') { sql = 'update package set price = $1 where id=$2' }
    else if (req.body.first === 'image') { sql = 'update package set image = $1 where id=$2' }

    // console.log(sql)

    pool.query(sql, [req.body.second, req.body.third]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("Package edited successfully")
    }).catch((err) => {
        console.log('error', err)
        return res.status(403).send(err);
    });

}

 

exports.update_message = (req, res) => {
    // console.log(req.body)

    pool.query('update visquery set reply = $1 where id=$2', [req.body.message,req.body.id]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("data saved successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.update_mobile = (req, res) => {
    // console.log(req.body)

    pool.query('update visitor set mobile = $1 where email=$2', [req.body.mobile, req.body.email]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("Mobile no updated successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}


exports.update_hotelwishlist = (req, res) => {
    // console.log(req.body)

    pool.query('update visitor set wishlist = $1 where email=$2', [req.body.id, req.body.email]).then((result) => {
        // console.log(result)
        // console.log(typeof([result.rows]))
        return res.status(200).send("hotel wishlist updated successfully")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.picture = (req, res) => {
    // console.log(req.body)

    pool.query('update visitor set picture=$1 where email=$2', [req.body.file,req.body.email]).then((result) => {
        // console.log(result)
        return res.status(200).send("Picture added")
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

exports.show_picture = (req, res) => {
    // console.log(req.body)

    pool.query('select picture from visitor where email=$1', [req.body.email]).then((result) => {
        // console.log(result)
        return res.status(200).send(result.rows)
    }).catch((err) => {
        console.log(err)
        return res.status(403).send(err);
    });

}

