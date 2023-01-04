CREATE database book_trading_app;

CREATE TABLE "city" (
  "id" serial ,
  "name" varChar(35) NOT NULL,
  primary key("id")
);

CREATE TABLE "genre" (
  "id" serial,
  "name" varChar(30) NOT NULL,
  primary key("id")
);

CREATE TABLE "language" (
  "id" serial,
  "name" varChar(30) NOT NULL,
  primary key("id")
);



CREATE TABLE "user" (
  "id" serial,
  "first_name" varChar(35) NOT NULL,
  "last_name" varChar(35) NOT NULL,
  "address" varChar(100) NOT NULL,
  "city_id" int,
  "user_name" varChar(30) NOT NULL,
  "password" varChar(40) NOT NULL,
  "email" varChar(80) NOT NULL,
  "type" smallint NOT NULL,
  primary key("id"),
  CONSTRAINT "FK_user.city_id"
    FOREIGN KEY ("city_id")
      REFERENCES "city"("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);


CREATE TABLE "book" (
  "id" serial,
  "title" varChar(100) NOT NULL,
  "genre_id" int,
  "isbn" int,
  "author_name" varChar(100) NOT NULL,
  "language_id" int,
  "purchase_price" float NOT NULL,
  "version" int NOT NULL,
  "description" varChar(2000) NOT NULL,
  "image" varChar(100) NOT NULL,
  "user_id" int ,
  "count" int NOT NULL,
  "status" int NOT NULL, /*for knowing if book is deleted or not
                           1 for delete ----- 0 for other  */
  primary key("id"),
  CONSTRAINT "FK_book.genre_id"
    FOREIGN KEY ("genre_id")
      REFERENCES "genre"("id")
      ON UPDATE CASCADE
      ON DELETE SET NULL    
      ,
  CONSTRAINT "FK_book.language_id"
    FOREIGN KEY ("language_id")
      REFERENCES "language"("id")
       ON UPDATE CASCADE
       ON DELETE SET NULL
      , CONSTRAINT "FK_book.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE "bid_item" (
  "id" serial,
  "user_id" int,
  "starting_time" timestamp,
  "ending_time" timestamp,
  "current_time" float NOT NULL,
  "book_id" int ,
  primary key("id"),
  CONSTRAINT "FK_bid_item.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user" ("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL
      ,
  CONSTRAINT "FK_bid_item.book_id"
    FOREIGN KEY ("book_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE CASCADE 
);

CREATE TABLE "bid" (
  "id" serial,
  "user_id" int NOT NULL,
  "bid_item_id" int NOT NULL,
  "price" float NOT NULL,
  "status" int NOT NULL,
  primary key("id"),
  CONSTRAINT "FK_bid.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_bid.bid_item_id"
    FOREIGN KEY ("bid_item_id")
      REFERENCES "bid_item"("id")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "notification" (
  "id" serial,
  "user_id" int NOT NULL,
  "read" smallint NOT NULL,
  "text" varChar(750) NOT NULL,
  "date" timestamp,
  primary key("id"),
  CONSTRAINT "FK_notification.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "wish_list_item" (
  "user_id" int NOT NULL,
  "book_id" int NOT NULL,
  primary key("user_id","book_id"),
  CONSTRAINT "FK_wish_list_item.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT "FK_wish_list_item.book_id"
    FOREIGN KEY ("book_id")
      REFERENCES "book"("id")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "driver" (
  "ssn" int,
  "user_id" int NOT NULL,
  "bike_license" varChar(20) NOT NULL,
  "driver_license" varChar(30) NOT NULL,
  "expiration_date" date NOT NULL,
  primary key("ssn"),
   CONSTRAINT "FK_driver.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE "coupons" (
  "id" serial,
  "code" varChar(20) NOT NULL,
  "discount" float NOT NULL,
  "maximum_use" int NOT NULL,
  "is_relative" int NOT NULL,
  primary key("id")
);

CREATE TABLE "order" (
  "id" serial,
  "user_id" int ,
  "driver_ssn" int,
  "order_date" timestamp ,
  "delivery_date" timestamp,
  "status" int,
  "coupon_id" int,
  "price" float,
  primary key("id"),
  CONSTRAINT "FK_order.driver_ssn"
    FOREIGN KEY ("driver_ssn")
      REFERENCES "driver"("ssn")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_order.coupon_id"
    FOREIGN KEY ("coupon_id")
      REFERENCES "coupons"("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL,
  CONSTRAINT "FK_order.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);



CREATE TABLE "ticket" (
  "id" serial,
  "user_id" int,
  "user_complaint" varChar(1000),
  "admin_reply" varChar(1000),
  "replied" int ,
  "ticket_time" timestamp,
  "reply_time" timestamp,
  primary key("id"),
  CONSTRAINT "FK_ticket.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL
);


CREATE TABLE "order_item" (
  "id" serial,
  "book_id" int NOT NULL,
  "order_id" int NOT NULL,
  "quantity" int NOT NULL,
  "paid_status" int NOT NULL,
  primary key("id"),
  CONSTRAINT "FK_orderItem.order_id"
    FOREIGN KEY ("order_id")
      REFERENCES "order"("id")
       ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT "FK_orderItem.book_id"
    FOREIGN KEY ("book_id")
      REFERENCES "book"("id")
       ON UPDATE CASCADE
      ON DELETE  CASCADE
);

CREATE TABLE "feedback" (
  "id" serial,
  "user_id" int,
  "book_id" int NOT NULL,
  "comment" varChar(500) NOT NULL,
  "rating" float NOT NULL,
  primary key("id"),
  CONSTRAINT "FK_feedback.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "user"("id")
       ON UPDATE CASCADE
      ON DELETE SET NULL
      ,
  CONSTRAINT "FK_feedback.book_id"
    FOREIGN KEY ("book_id")
      REFERENCES "book"("id")
       ON UPDATE CASCADE
      ON DELETE CASCADE
);

