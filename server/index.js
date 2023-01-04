const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { timeStamp, log } = require("console");

//middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//routes

//signup & login

//create app.post (validation if exist) sign up
//if driver open other page
//update extra info app.put
//create app.post (validation if exist & send type) sign in

// signup
//************************user*******************************/
//type
//0 =>superadmin
//1 =>admin
//2 =>user
//3 =>store
//4 =>driver

app.post("/signup", async (req, res) => {
  try {
    const { first, last, address, city_id, user_name, password, email, type } =
      req.body;
    const mail = await pool.query('select email from "user" where email=$1', [
      email,
    ]);
    if (mail.rowCount != 0) {
      //testing if the same email is already in the database or not
      res.json("email already in use");
      return;
    }
    if (type == 4) {
      //in case the sign up is a driver
      const { ssn, bike_license, driver_license, expiration_date } = req.body;
      isSssn = await pool.query("SELECT ssn FROM driver WHERE ssn=$1", [ssn]);
      if (isSssn.rowCount != 0) {
        //checks for ssn if already in use
        res.json("ssn already in use");
        return;
      }
      isBike = await pool.query(
        "SELECT bike_license FROM driver WHERE bike_license=$1",
        [bike_license]
      );
      if (isBike.rowCount != 0) {
        //checks for bike license if already in use
        res.json("bike license already in use");
        return;
      }
      isDriver = await pool.query(
        "SELECT driver_license FROM driver WHERE driver_license=$1",
        [driver_license]
      );
      if (isDriver.rowCount != 0) {
        //checks for driver license if already in use
        res.json("driver license already in use");
        return;
      }
      //creats user to link it later to driver
      const sign = await pool.query(
        'INSERT INTO "user" ' +
        "(first_name,last_name,address,city_id,user_name,password,email,type) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
        [first, last, address, city_id, user_name, password, email, type]
      );
      console.log(sign.rows[0].id);
      // creating driver and linkning it to user
      const driver = await pool.query(
        "insert into driver(ssn,user_id,bike_license,driver_license,expiration_date) values($1,$2,$3,$4,$5) returning *",
        [ssn, sign.rows[0].id, bike_license, driver_license, expiration_date]
      );
      res.json(sign.rows[0]);
    } // in case of creating any other user than driver
    else {
      const sign = await pool.query(
        'INSERT INTO "user" ' +
        "(first_name,last_name,address,city_id,user_name,password,email,type) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
        [first, last, address, city_id, user_name, password, email, type]
      );
      res.json(sign.rows[0]);
      if (type == "2") {
        const order = await pool.query(
          `INSERT INTO "order" (user_id,status,price) VALUES ($1,$2,0) RETURNING *`,
          [sign.rows[0].id, 0]
        );
        console.log(order.rows[0]);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const person = await pool.query(
      `SELECT id,first_name,last_name,address,city_id,user_name,email,type FROM "user" WHERE email=$1 AND password=$2`,
      [email, password]
    );

    if (person.rowCount != 0) {
      res.json(person.rows[0]);
      console.log(person.row[0]);
    } else {
      res.json("-1");
      console.log(person.row[0]);
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/updateUser", async (req, res) => {
  try {
    const { first, last, address, city_id, user_name, id } = req.body;
    console.log(first, last, address, city_id, user_name, id);
    const updateUser = await pool.query(
      'UPDATE "user" SET first_name = $1, last_name = $2, address = $3, city_id = $4, user_name = $5 WHERE id = $6 RETURNING *',
      [first, last, address, city_id, user_name, id]
    );
    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/notifications", async (req, res) => {
  try {
    // return the last 10 notifications
    // page returns other 10's
    var { user_id, page } = req.body;
    page = (page - 1) * 10;
    console.log(user_id, page);
    const viewNotifications = await pool.query(
      "SELECT * FROM notification WHERE user_id = $1 ORDER BY date DESC LIMIT 10 offset $2;",
      [user_id, page]
    );
    res.json(viewNotifications.rows);
    //front end should loop on all feedbacks and display them
  } catch (err) {
    console.error(err.message);
  }
});

//read notification
app.post("/notification/read", async (req, res) => {
  try {
    const { notification_id } = req.body;
    const readNotification = await pool.query(
      "UPDATE notification SET read=1 where id=$1 returning *",
      [notification_id]
    );
    res.json(readNotification.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.get("/storeData/:id", async (req, res) => {
  //takes user id of store and returns its name and adress
  try {
    const { id } = req.params;
    const order = await pool.query(
      'select user_name,address from "user" where id =$1 and type not in (0,1)',
      [id]
    );
    res.json(order.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/notifications/readall", async (req, res) => {
  try {
    const { notification_id } = req.body;
    const realAllNotifications = await pool.query(
      "UPDATE notification SET read=1 where id=$1 returning &",
      [notification_id]
    );
    res.json(realAllNotifications);
  } catch (err) {
    console.error(err);
  }
});

//************************wish list*******************************/

app.post("/addWishlist", async (req, res) => {
  try {
    const { user_id, book_id } = req.body; //why did we do this
    console.log(user_id, book_id);
    //NEEDS VALIDATION AND REVISION
    const addWishlist = await pool.query(
      "INSERT INTO wish_list_item (user_id,book_id) VALUES ($1,$2) RETURNING *;",
      [user_id, book_id]
    );
    res.json(addWishlist.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/deleteWishlist", async (req, res) => {
  try {
    const { user_id, book_id } = req.body;
    //NEEDS VALIDATION AND REVISION
    const deleteWishlist = await pool.query(
      "DELETE FROM wish_list_item  WHERE user_id = $1 AND book_id = $2 RETURNING *;",
      [user_id, book_id]
    );
    if (deleteWishlist.rowCount == 0) {
      res.json(`WISHLIST ALREADY ISN'T IN THE SYSTEM`);
      console.log(`WISHLIST ALREADY ISN'T IN THE SYSTEM`);
    } else {
      res.json(deleteWishlist.rows[0]);
      console.log(`SUCCESSFUL DELETION`);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/wishlists/:user_id", async (req, res) => {
  //takes user id and returns the data of the wishlisted books
  try {
    const { user_id } = req.params;
    const viewUserWishlists = await pool.query(
      "SELECT book_id,title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,count,status FROM wish_list_item,book WHERE wish_list_item.user_id = $1 and wish_list_item.book_id=book.id;",
      [user_id]
    );
    res.json(viewUserWishlists.rows); //book_id refers to what?
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/wishlists_stats", async (req, res) => {
  //returns the wishlisted books with their count of wishlist
  try {
    const viewUserWishlists = await pool.query(
      `SELECT book_id,count(book_id) as "countUsers",title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,count,status FROM wish_list_item,book WHERE wish_list_item.book_id=book.id group by book_id,title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,count,status ;`
    );
    res.json(viewUserWishlists.rows); //book_id refers to what?
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/wishlists_stats/:user_id", async (req, res) => {
  //returns the wishlisted books with their count of wishlist for a certain user id
  //will use it in store to get it's wishlisted books and its count :)
  try {
    const { user_id } = req.params;
    const viewUserWishlists = await pool.query(
      `SELECT book_id,count(book_id) as "countUsers",title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,count,status FROM wish_list_item,book WHERE wish_list_item.book_id=book.id and book_id in(select id from book where user_id=$1)group by book_id,title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,count,status ;`,
      [user_id]
    );
    res.json(viewUserWishlists.rows); //book_id refers to what?
  } catch (err) {
    console.error(err.message);
  }
});

//************************book*******************************/

app.get("/books", async (req, res) => {
  try {
    const getBooks = await pool.query(
      'SELECT * FROM book WHERE book.user_id in (select id from "user" where type =3) and status = 0 and count>0'
    );
    res.json(getBooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/usersellbooks", async (req, res) => {
  try {
    const getBooks = await pool.query(
      'SELECT * FROM book WHERE book.user_id in (select id from "user" where type =2) and status = 0 and count>0'
    );
    res.json(getBooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/usersellbooks", async (req, res) => {
  try {
    const getBooks = await pool.query(
      'SELECT * FROM book WHERE book.user_id in (select id from "user" where type =2) and status = 0'
    );
    res.json(getBooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/bookinfo", async (req, res) => {
  try {
    const { book_id } = req.body;
    const getBookInfo = await pool.query("SELECT * FROM book WHERE id = $1", [
      book_id,
    ]);
    res.json(getBookInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/bookinfo/:book_id", async (req, res) => {
  try {
    const { book_id } = req.params;
    const getBookInfo = await pool.query("SELECT * FROM book WHERE id = $1", [
      book_id,
    ]);
    res.json(getBookInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/bookinfo/quantity", async (req, res) => {
  try {
    const { book_id } = req.body;
    const getBookInfo = await pool.query(
      "SELECT count,status FROM book WHERE id = $1",
      [book_id]
    );
    res.json(getBookInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/addbook", async (req, res) => {
  try {

    var {
      title,
      genre_id,
      isbn,
      author_name,
      language_id,
      purshace_price,
      version,
      description,
      image,
      user_id,
      count,
    } = req.body;
    console.log(language_id);
    //checking for nulls in gernre,isbn,language_id
    //front enter enters user couut with 1 but bookstores count with anything
    //front end will not let other users (superadmin-admin-driver) go into the my books page
    if (genre_id == -1) genre_id = "null";
    if (isbn == -1) isbn = "null";
    if (language_id == -1) language_id = "null";
    console.log(`INSERT INTO book (title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,user_id,count,status) values
      ('${title}',${genre_id},'${isbn}' ,'${author_name}', ${language_id} ,${purshace_price},${version},'${description}' ,'${image}',${user_id},${count},0) RETURNING *;`);
    book = await pool.query(
      `INSERT INTO book (title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,user_id,count,status) values
      ('${title}',${genre_id},'${isbn}' ,'${author_name}', ${language_id} ,${purshace_price},${version},'${description}' ,'${image}',${user_id},${count},0) RETURNING *;`
    );
    res.json(book.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});




//stores delete books app.delete
app.post("/deletebook", async (req, res) => {
  try {
    const { id } = req.body;
    book = await pool.query("UPDATE BOOK SET status=1 where id=$1", [id]);
    res.json(book.rowCount);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/userbooks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getUserStoreBooks = await pool.query(
      "SELECT * FROM book WHERE user_id=$1 AND status=0",
      [id]
    );
    res.json(getUserStoreBooks.rows);
    //front end should loop on all books in certain user/store selling and display them
  } catch (err) {
    console.error(err.message);
  }
});

//************************order*******************************/

app.post("/addToCart", async (req, res) => {
  try {
    const { book_id, order_id, quantity } = req.body;
    console.log(book_id, order_id, quantity);
    const found = await pool.query(
      "select id from order_item where book_id=$1 and order_id=$2",
      [book_id, order_id]
    );
    if (found.rowCount == 1) {
      res.json(-1);
      return;
    }
    const orderItem = await pool.query(
      "INSERT INTO order_item (book_id,order_id,quantity,paid_status) VALUES ($1,$2,$3,0) RETURNING *",
      [book_id, order_id, quantity]
    );
    res.json(orderItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/userOrder", async (req, res) => {
  try {
    const { id } = req.body;
    const order = await pool.query(
      'select * from "order" where user_id=$1 and status=0',
      [id]
    );
    res.json(order.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/makeOrder", async (req, res) => {
  try {
    var { code, order_id, price } = req.body;
    var coupon;

    if (code != "") {
      coupon = await pool.query(
        "select id,maximum_use from coupons where code=$1",
        [code]
      );

      if (coupon.rowCount == 0 || coupon.rows[0].maximum_use < 1) {
        res.json("wrong coupon");
        return;
      }
      const updateCopun = await pool.query(
        'UPDATE "coupons" SET maximum_use=$1 where code=$2',
        [coupon.rows[0].maximum_use - 1, code]
      );
    }

    if (price == 0) {
      res.json("empty cart");
      return;
    }

    const books = await pool.query(
      "select book_id,quantity,count from order_item,book where book_id=book.id and order_id=$1;",
      [order_id]
    );
    var ok = 1;
    console.log(books.rowCount);
    for (let i = 0; i < books.rowCount; i++) {
      console.log(books.rows[i]);
      if (books.rows[i].count < books.rows[i].quantity) {
        ok = 0;
        await pool.query(
          "delete from order_item where order_id=$1 and book_id=$2",
          [order_id, books.rows[i].book_id]
        );
      }
    }

    if (ok == 0) {
      res.json("insufficient amount of books (order items deleted)");
      return;
    }
    for (let i = 0; i < books.rowCount; i++) {
      await pool.query("update book set count =$1 where id=$2", [
        books.rows[i].count - books.rows[i].quantity,
        books.rows[i].book_id,
      ]);
    }

    const date = new Date();
    console.log(date);
    const makeOrder = await pool.query(
      'UPDATE "order" SET status=1,order_date = $1,price =' +
      price +
      " WHERE id=$2 RETURNING *",
      [date, order_id]
    );
    //res.json(makeOrder.rows[0]);
    const newOrder = await pool.query(
      `INSERT INTO "order" (user_id,status,price) VALUES ($1,0,0) RETURNING *`,
      [makeOrder.rows[0].user_id]
    );
    res.json(newOrder.rows[0]); //we always check on the order with status 0 thus orders items in the cart
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/order/total/:id", async (req, res) => {
  try {
    const { user_id } = req.body;
    const order = await pool.query(
      'select * from "order" where user_id=$1 and status=0',
      [user_id]
    );
    res.json(order.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Admin gives order to certain driver
app.post("/AdminGiveOrderToDriver", async (req, res) => {
  try {
    //assuming admin only sees orders of status one here
    const { driver_ssn, order_id, driver_user_id } = req.body;
    console.log(driver_ssn, order_id, driver_user_id);
    //status 2 means driver starts delivering
    const giveOrder = await pool.query(
      'UPDATE "order" SET status=2,driver_ssn = $1 WHERE id=$2 RETURNING *',
      [driver_ssn, order_id]
    );
    //send notification to driver
    const date = new Date();
    console.log(order_id);
    console.log(driver_user_id);
    console.log(date);
    const sendNotificationDriver = await pool.query(
      "INSERT INTO notification (user_id,read,text,date) VALUES ($1,0,'You have been assigned order #" +
      order_id +
      " ',$2) RETURNING *",
      [driver_user_id, date]
    );
    const sendNotificationUser = await pool.query(
      "INSERT INTO notification (user_id,read,text,date) VALUES ($1,0,'Your order #" +
      order_id +
      " has been assigned to a driver',$2) RETURNING *",
      [giveOrder.rows[0].user_id, date]
    );
    console.log(sendNotificationDriver.rows[0]);
    console.log(sendNotificationUser.rows[0]);
    res.json(giveOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Delivered
app.post("/deliverOrder", async (req, res) => {
  try {
    const { order_id } = req.body;
    const date = new Date();
    //status 3 means driver delivered it
    const deliverOrder = await pool.query(
      'UPDATE "order" SET status=3,delivery_date = $1 WHERE id=$2 RETURNING *',
      [date, order_id]
    );
    res.json(deliverOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//view order
app.get("/orders", async (req, res) => {
  try {
    const viewOrders = await pool.query("SELECT * FROM order;");
    res.json(viewOrders.rows);
    //front end should loop on all orders and display them
  } catch (err) {
    console.error(err.message);
  }
});

//admin views order
app.get("/orders/:id", async (req, res) => {
  //takes order id and returns it's order items data and book related to it
  try {
    const { id } = req.params;
    const viewOrder = await pool.query(
      "select order_item.id,book_id,quantity,title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image from order_item,book where book_id=book.id and order_id=$1;",
      [id]
    ); //return order items to user
    res.json(viewOrder.rows);
    //front end should display one order when click on it
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/orders/userDriver/:id", async (req, res) => {
  //takes order id and returns it's user and ssn of driver
  try {
    const { id } = req.params;
    const viewOrder = await pool.query(
      `select user_id,ssn from "order" where id=$1;`,
      [id]
    ); //return order items to user
    res.json(viewOrder.rows);
    //front end should display one order when click on it
  } catch (err) {
    console.error(err.message);
  }
});

//admin views pending orders
app.get("/pendingOrders", async (req, res) => {
  try {
    const viewPendingOrders = await pool.query(
      'SELECT * FROM "order" WHERE status = 1;'
    );
    res.json(viewPendingOrders.rows);
    //front end should loop on all orders and display them
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/pendingOrders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const viewPendingOrder = await pool.query(
      'SELECT * FROM "order" WHERE id = $1;',
      [id]
    );
    res.json(viewPendingOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/orderItemInfo/:book_id", async (req, res) => {
  try {
    const { book_id } = req.params;
    const getOrderItemInfo = await pool.query(
      "SELECT * FROM book b, order_item o WHERE b.id = o.book_id AND b.id = $1",
      [book_id]
    );
    res.json(getOrderItemInfo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/orderstatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getOrderStatus = await pool.query(
      'SELECT status FROM "order" WHERE id = $1',
      [id]
    );
    res.json(getOrderStatus.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

///////////////////who knows what/////////////
//unread number

//retrieve all books app.get

//stores add books app.post

//add book to cart

//user submits order

//UNDER CONSTRUCTION (REAL ALL)

// app.post("/addImage", async (req, res) => {
//     try {
//         console.log(pr);
//      const {image}=req.body;
//      const result=await cloudinary.uploader.upload(image,{
//     folder : books
//     })

//      console.log(result.public_id,result.secure_url);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

//user delete bidItem app.delete
//user adds wishlist app.post
//user views wishlists app.get
//user adds bid app.post
//users view all bids app.get
//user bids app.post

//driver views pending assigned order app.get
//driver finishes order app.post
//get cities

//admin adds coupon app.post (DONE)
//admin sees user's wishlist app.get (NEEDS REVISION)
//admin assigns orders to drivers app.post

//(NEEDS REVISION WHEN SIGNIN IN DONE & (DRIVER,users,bookstores) IS ADDED TO THE SYSTEM)
//admin views all drivers info app.get
//admin views all users info app.get
//admin views all stores info app.get
//admin views all orders

/////////////////////////////COUPONS/////////////////////////////

app.post("/addCoupon", async (req, res) => {
  try {
    //validated in backend
    //code not repeated
    const { code, discount, maximum_use, is_relative } = req.body;
    const couponExist = await pool.query(
      "SELECT * FROM Coupons WHERE code = $1;",
      [code]
    );
    if (couponExist.rowCount == 0) {
      //validation in frontend needed
      //discount positive
      //maximum positive
      //isRelative 0,1
      const newCoupon = await pool.query(
        "INSERT INTO coupons (code,discount,maximum_use,is_relative) VALUES ($1,$2,$3,$4) RETURNING *;",
        [code, discount, maximum_use, is_relative]
      );
      res.json(newCoupon.rows[0]);
      console.log(`SUCCESSFUL INSERTION`);
      //front end should have 4 things for add code
    } else {
      console.log(`${code} is already added in the system`);
      res.json(`-1`);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/deleteCoupon", async (req, res) => {
  try {
    //frontend should call this to delete a coupon sending coupon name
    const { code } = req.body;
    const deleteCoupon = await pool.query(
      "DELETE FROM Coupons WHERE code = $1 RETURNING *;",
      [code]
    );
    if (deleteCoupon.rowCount == 0) {
      res.send(`COUPON ALREADY ISN'T IN THE SYSTEM`);
      console.log(`COUPON ALREADY ISN'T IN THE SYSTEM`);
    } else {
      res.json(deleteCoupon.rows[0]);
      console.log(`SUCCESSFUL DELETION`);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/coupons", async (req, res) => {
  try {
    const getCoupon = await pool.query("SELECT * FROM Coupons;");
    res.json(getCoupon.rows);
    //front end should loop on all coupons and display them
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/coupons/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const getCoupon = await pool.query(`SELECT * FROM Coupons where code='${code}';`);
    res.json(getCoupon.rows);
    //front end should loop on all coupons and display them
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/applyCoupon", async (req, res) => {
  try {
    const { coupon_code } = req.body;
    const getCoupon = await pool.query(
      "SELECT id,code,discount,is_relative FROM Coupons WHERE code = $1;",
      [coupon_code]
    );
    if (getCoupon.rowCount == 0) {
      res.json(-1);
      return;
    }
    res.json(getCoupon.rows[0]);
    //front end should display single coupon
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/coupons/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const getCoupon = await pool.query("DELETE FROM Coupons WHERE code = $1;", [
      code,
    ]);
    res.json(getCoupon.rows[0]);
    //front end should display single coupon
  } catch (err) {
    console.error(err.message);
  }
});

/////////////////////////////COUPONS/////////////////////////////

//wishlist

/////////////////////////////ADMIN/////////////////////////////

//superadmin views admins
app.get("/admins", async (req, res) => {
  try {
    const viewAdmins = await pool.query(`SELECT * FROM "user" WHERE type = 1;`);
    res.json(viewAdmins.rows);
    //front end should loop on all admins and display their info
  } catch (err) {
    console.error(err.message);
  }
});

//superadmin views admin
app.get("/admins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const viewAdmin = await pool.query(
      `SELECT * FROM "user" WHERE type = 1 AND id = $1;`,
      [id]
    );
    res.json(viewAdmin.rows[0]);
    //front end should display one admin when click on him
  } catch (err) {
    console.error(err.message);
  }
});

//admin views drivers
app.get("/drivers", async (req, res) => {
  try {
    const viewDrivers = await pool.query(
      `SELECT * FROM driver d, "user" u WHERE u.type = 4 AND d.user_id=u.id;`
    );
    res.json(viewDrivers.rows);
    //front end should loop on all drivers and display them
  } catch (err) {
    console.error(err.message);
  }
});

//admin views driver
app.get("/drivers/:ssn", async (req, res) => {
  try {
    const { ssn } = req.params;
    const viewDriver = await pool.query(
      `SELECT * FROM driver d,"user" u WHERE d.ssn = $1 AND d.user_id = u.id;`,
      [ssn]
    );
    res.json(viewDriver.rows[0]);
    //front end should display one driver when click on him
  } catch (err) {
    console.error(err.message);
  }
});

//admin views driver
app.post("/driverssnfromdriverid", async (req, res) => {
  try {
    const { id } = req.body;
    const getDriverSSN = await pool.query(
      `SELECT ssn FROM driver  WHERE id = $1;`,
      [id]
    );
    res.json(getDriverSSN.rows[0]);
    //front end should display one driver when click on him
  } catch (err) {
    console.error(err.message);
  }
});

//admin views stores
app.get("/stores", async (req, res) => {
  try {
    const viewStores = await pool.query(`SELECT * FROM "user" WHERE type = 3;`);
    res.json(viewStores.rows);
    //front end should loop on all stores and display them
  } catch (err) {
    console.error(err.message);
  }
});

//admin views store
app.get("/stores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const viewStore = await pool.query(
      `SELECT * FROM "user" WHERE type = 3 AND id = $1;`,
      [id]
    );
    res.json(viewStore.rows[0]);
    //front end should display one store when click on it
  } catch (err) {
    console.error(err.message);
  }
});

//admin views users
app.get("/users", async (req, res) => {
  try {
    const viewUsers = await pool.query(`SELECT * FROM "user" WHERE type = 2;`);
    res.json(viewUsers.rows);
    //front end should loop on all users and display them
  } catch (err) {
    console.error(err.message);
  }
});

//admin views user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const viewUser = await pool.query(
      `SELECT * FROM "user" WHERE type = 2 AND id = $1;`,
      [id]
    );
    res.json(viewUser.rows[0]);
    //front end should display one user when click on it
  } catch (err) {
    console.error(err.message);
  }
});

//get driver user id given ssn
app.post("/driveruseridgivenssn", async (req, res) => {
  try {
    const { driver_ssn } = req.body;
    const getuserid = await pool.query(
      "SELECT user_id FROM driver WHERE ssn = $1;",
      [driver_ssn]
    );
    console.log(getuserid.rows[0]);
    res.json(getuserid.rows[0]);
    //front end should loop on all orders and display them
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/driver/orders/:ssn", async (req, res) => {
  //takes ssn of driver and returns orders that he has to do
  try {
    const { ssn } = req.params;
    const { status } = req.body; //takes status to know if we want in delivery orders or orders that he has already deliverd
    const viewOrder = await pool.query(
      `select * from "order" where driver_ssn =$1 and status=$2;`,
      [ssn, status]
    );
    res.json(viewOrder.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//admin views all users feedback
app.get("/feedback", async (req, res) => {
  try {
    const viewfeedbacks = await pool.query("SELECT * FROM feedback;");
    res.json(viewfeedbacks.rows);

    //front end should loop on all feedbacks and display them
  } catch (err) {
    console.error(err.message);
  }
});

/////////////////////////////ADMIN/////////////////////////////

//////////////MOHAMED & MUSTAFA REQUESTS///////////////////////
//wishlisted items for certain user done
//count and group by wish list items for admin done
//count and group by wish list items for store  done
//select orders to deliver for driver done
// select order items of a certain order line(583)

app.get("/ordersbycertaindriver/:ssn", async (req, res) => {
  try {
    const { ssn } = req.params;
    const viewOrders = await pool.query(
      'SELECT * FROM driver d,"order" o WHERE o.driver_ssn = d.ssn AND d.ssn = $1 AND o.status = 2;',
      [ssn]
    ); //order to be delivered by certain driver
    res.json(viewOrders.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/ordersdeliveredbycertaindriver/:ssn", async (req, res) => {
  try {
    const { ssn } = req.params;
    console.log(ssn);
    const viewDeliveredOrders = await pool.query(
      'SELECT * FROM driver d,"order" o WHERE o.driver_ssn = d.ssn AND d.ssn = $1 AND o.status = 3;',
      [ssn]
    ); //order to be delivered by certain driver
    res.json(viewDeliveredOrders.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/driverorderitemstodeliver", async (req, res) => {
  try {
    const { ssn } = req.body;
    const viewOrders = await pool.query(
      "SELECT * FROM driver d,order_item o WHERE o.driver_ssn = d.ssn AND d.ssn = $1 ;",
      [ssn]
    ); //don't know yet how to write
    res.json(viewOrders.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/driverssnfromdriverid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const getDriverSSN = await pool.query(
      `SELECT ssn FROM driver  WHERE user_id = $1;`,
      [id]
    );
    console.log(getDriverSSN.rows[0]);
    res.json(getDriverSSN.rows[0]);
    //front end should display one driver when click on him
  } catch (err) {
    console.error(err.message);
  }
});
//************************tickets*******************************/

app.post("/addTicket", async (req, res) => {
  try {
    const { user_id, complaint } = req.body;

    const addTicket = await pool.query(
      "INSERT INTO ticket  (user_id,user_complaint,admin_reply,replied,ticket_time,reply_time) VALUES ($1,$2,null,0,$3,null) returning *;",
      [user_id, complaint, new Date()]
    );
    res.json(addTicket.rows[0]);
    //front end should display one driver when click on him
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/ticketReply", async (req, res) => {
  try {
    const { adminReply, id } = req.body;

    const replyTicket = await pool.query(
      "UPDATE ticket SET admin_reply=$1,replied = 1,reply_time=$2 WHERE id =$3 returning *;",
      [adminReply, new Date(), id]
    );
    res.json(replyTicket.rows[0]);
    //front end should display one driver when click on him
  } catch (err) {
    console.error(err.message);
  }
});


app.get("/userViewTickets/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userViewTickets = await pool.query("SELECT * FROM ticket WHERE user_id = $1", [id]);
    res.json(userViewTickets.rows);
    //front end should display one driver when click on him
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/adminViewTickets", async (req, res) => {
  try {
    const adminViewTickets = await pool.query("SELECT * FROM ticket WHERE replied = 0");
    res.json(adminViewTickets.rows);
    //front end should display one driver when click on him
  } catch (err) {
    console.error(err.message);
  }
});

//**************************bidding*******************************/

app.post("/addbidbook", async (req, res) => {
  try {

    var {
      title,
      genre_id,
      isbn,
      author_name,
      language_id,
      purshace_price,
      version,
      description,
      image,
      user_id,
      count
    } = req.body;
    console.log(
      language_id
    );

    if (genre_id == -1) genre_id = "null";
    if (isbn == -1) isbn = "null";
    if (language_id == -1) language_id = "null";
    console.log(`INSERT INTO book (title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,user_id,count,status) values
      ('${title}',${genre_id},'${isbn}' ,'${author_name}', ${language_id} ,${purshace_price},${version},'${description}' ,'${image}',${user_id},${count},3) RETURNING *;`);
    book = await pool.query(
      `INSERT INTO book (title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,user_id,count,status) values
      ('${title}',${genre_id},'${isbn}' ,'${author_name}', ${language_id} ,${purshace_price},${version},'${description}' ,'${image}',${user_id},${count},3) RETURNING *;`
    );
    console.log(book.rows[0]);
    //book_id => book.rows[0].id
    //validate ending_time front end

    const { ending_time } = req.body;
    console.log(ending_time);
    const ending_time2= new Date(ending_time);
    console.log(ending_time2); 
    //const x = new Date(ending_time); 
    const starting_time = new Date();
    console.log(starting_time.toISOString());
    console.log();
console.log(`INSERT INTO bid_item (user_id,starting_time,ending_time,book_id) VALUES (null,'${starting_time.toISOString()}','${ending_time2.toISOString()}',${book.rows[0].id});`);
    newBid =await pool.query(`INSERT INTO bid_item (user_id,starting_time,ending_time,book_id) VALUES (null,'${starting_time.toISOString()}','${ending_time2.toISOString()}',${book.rows[0].id});`)
    res.json(newBid.rows[0]);
  } 
  catch (err) {
    console.error(err.message);
  }
});

app.post("/addbidonbook", async (req, res) => {
  try {
    //validate front end on purchase price before come here
    const { user_id, book_id, purshace_price } = req.body;
    console.log( user_id, book_id, purshace_price);

    updatePurchasePrice = await pool.query('UPDATE book SET purchase_price = $1 WHERE id = $2 returning *;', [purshace_price, book_id])
    console.log(updatePurchasePrice.rows);
    
    placeBid = await pool.query('UPDATE bid_item SET user_id = $1 WHERE book_id = $2 returning *', [user_id, book_id])
    log(placeBid.rows);
    res.json(updatePurchasePrice.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});
app.post("/myBid", async (req, res) => {
  try {
    const { user_id } = req.body;
    console.log(`select * from book where status=3 and user_id=${user_id}`);
    myBidBooks =await pool.query(`select book_id,title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,count,status,starting_time,ending_time,bid_item.id as bid_id from book,bid_item where status=3 and book.user_id=${user_id} and bid_item.book_id=book.id;`)
    console.log(myBidBooks.rows);
    res.json(myBidBooks.rows);


  } catch (err) {
    console.error(err.message);
  }
});

app.post("/bidfinished", async (req, res) => {
  try {
    //validate front end on end time before come here
    const { book_id } = req.body;
    const finishedBid =await pool.query('UPDATE book SET status = 4 WHERE id = $1 returning *', [book_id])
    console.log(finishedBid.rows[0]);
    const bidItem =await pool.query(`select * from bid_item where book_id=${book_id}`)
    if(bidItem.rows[0].user_id==null){
      res.json('no user purshaed')
      return
    }
    const winner=await pool.query(`select * from "user" where id =${bidItem.rows[0].user_id} `)
    const date=new Date();
    const sendNotificationUser = await pool.query(
      `INSERT INTO notification (user_id,read,text,date) VALUES ($1,0,'you have won the bid on book${finishedBid.rows[0].title} heres the owners email to contact him  ${winner.rows[0].email} ',$2) RETURNING *`,
      [winner.rows[0].id, date]
    );
    res.json(finishedBid.rows[0]);


  } catch (err) {
    console.error(err.message);
  }
});

app.get("/bidbooks", async (req, res) => {
  try {
    const getBidBooks = await pool.query(
      'SELECT * FROM book WHERE book.user_id in (select id from "user" where type =2) and status = 3'
    );
    res.json(getBidBooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/bid_item_data", async (req, res) => {
  try {
    const {book_id}=req.body;
    const getBidBooks = await pool.query(
      `select * from bid_item where book_id=${book_id};`
    );
    res.json(getBidBooks.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//************************utilities*******************************/
app.get("/cities", async (req, res) => {
  try {
    const cities = await pool.query("select * from city");
    res.json(cities.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/genres", async (req, res) => {
  try {
    const genres = await pool.query("SELECT * FROM genre");
    res.json(genres.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/languages", async (req, res) => {
  try {
    const languages = await pool.query("SELECT * FROM language");
    res.json(languages.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/cityidfromcityname", async (req, res) => {
  try {
    const { city_name } = req.body;
    const city_id = await pool.query(`SELECT id FROM city WHERE name = $1`, [
      city_name,
    ]);

    if (city_id.rowCount != 0) {
      res.json(city_id.rows[0]);
      console.log(city_id.row[0]);
    } else {
      res.json("-1");
      console.log(city_id.row[0]);
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/genrenamefromgenreid/:genre_id", async (req, res) => {
  try {
    const { genre_id } = req.params;
    const getGenreName = await pool.query(
      "SELECT name FROM genre WHERE id = $1",
      [genre_id]
    );
    res.json(getGenreName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/languagenamefromlanguageid/:language_id", async (req, res) => {
  try {
    const { language_id } = req.params;
    const getLanguageName = await pool.query(
      "SELECT name FROM language WHERE id = $1",
      [language_id]
    );
    res.json(getLanguageName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/pendingOrders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const viewPendingOrder = await pool.query(
      'SELECT * FROM "order" WHERE id = $1;',
      [id]
    );
    res.json(viewPendingOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/deleteOrderItem", async (req, res) => {
  try {
    const { id } = req.body;
    const order = await pool.query(`delete  from "order_item" where id=${id} `);
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});
