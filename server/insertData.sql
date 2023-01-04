/*city insert*/
INSERT INTO city ("name") values ('Giza'),('Cairo'),('Alexandria'),('Aswan'),('Luxor'),('Damietta'),('Suez'),('Ismailia'),('Port Said'),('Asyut'),('Qena'),('Sohag'),('Kafr El Sheikh'),('Beni Suef'),('North Sinai'),('Beheira'),('Minya'),('Faiyum'),('Qalyubia'),('Tanta'),('Zagazig');

/*genre insert*/
INSERT INTO genre ("name") values ('Contemporary Fiction'),('Classic Fiction'),('Action and Adventure Fiction'),('Dystopian Fiction'),('Fantasy Fiction'),('Graphic Novel'),('Historical Fiction'),('Horror Fiction'),('Art and Photography'),('Biography'),('Cookbooks'),('Historical Nonfiction'),('How-to and DIY'),('Humor'),('Memoir and Autobiography'),('Parenting'),('Philosophy'),('Religion and Spirituality'),('Self-Help'),('True Crime'),('Travel')
,('Literary Fiction'),('Mystery Fiction'),('Science Fiction'),('Short Story'),('Thriller Fiction'),('Utopian Fiction'),('Western Fiction'),('Manga');

/*language insert*/
INSERT INTO language ("name") values ('Arabic'),('English'),('Japanese'),('Turksish'),('Spanish'),('French'),('Chinese'),('Hindi');

/*superadmin insert*/

INSERT INTO "user" (first_name,last_name,address,city_id,user_name,password,email,type) VALUES ('Super','Admin','',1,'superAdmin','0000','superAdmin@gmail.com',0),
('store','store','cufe gize',3,'store','123','store1@gmail.com',3),
('store2','store2','tagmo3 cairo',2,'store2','123','store2@gmail.com',3),
('store3','store3','minya 5 4aref han5las ISA',5,'store3','123','store3@gmail.com',3),
('user','user','wow 5 4aref han5las ISA',5,'user','123','user1@gmail.com',2),
('user2','user2','hello  giza',6,'123','user2','user2@gmail.com',2),
('user3','user3','kady is king',20,'123','user3','user3@gmail.com',2);

INSERT INTO "book" ("title","genre_id","isbn","author_name","language_id","purchase_price","version","description","image","user_id","count","status")
 VALUES ('Introduction to Algorithms, 3rd Edition (The MIT Press)',null,null,'Thomas H. Cormen','2','350','1','book for algo','https://m.media-amazon.com/images/P/0262033844.01._SCLZZZZZZZ_SX500_.jpg','2','50','0'),
 VALUES ('test book',null,null,'Thomas H. Cormen','2','350','1','book for algo','https://edit.org/images/cat/book-covers-big-2019101610.jpg','2','50','0'),
 VALUES ('test book',null,null,'Thomas H. Cormen','2','350','1','book for algo','https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg','2','50','0'),
 VALUES ('a million to one',null,null,'Thomas H. Cormen','2','350','1','book for algo','https://res.cloudinary.com/scastiel/image/upload/v1666969465/dmeeuxpg0hwq3wvmqlhc.jpg','2','50','0'),
 ('Introduction to Algorithms, 3rd Edition (The MIT Press)',null,null,'Thomas H. Cormen','2','350','1','book for algo','https://m.media-amazon.com/images/P/0262033844.01._SCLZZZZZZZ_SX500_.jpg','2','50','0'),
 ('Introduction to Algorithms, 3rd Edition (The MIT Press)',null,null,'Thomas H. Cormen','2','350','1','book for algo','https://m.media-amazon.com/images/P/0262033844.01._SCLZZZZZZZ_SX500_.jpg','2','50','0'),
 ('Introduction to Algorithms, 3rd Edition (The MIT Press)',null,null,'Thomas H. Cormen','2','350','1','book for algo','https://m.media-amazon.com/images/P/0262033844.01._SCLZZZZZZZ_SX500_.jpg','2','50','0'),
 ('Cracking the Coding Interview: 189 Programming Questions and Solutions',null,null,'Gayle Laakmann McDowell ','3','400','1','book for interviews','https://m.media-amazon.com/images/P/0984782850.01._SCLZZZZZZZ_SX500_.jpg','2','50','0'),

 ('Cracking the Coding Interview: 189 Programming Questions and Solutions',null,null,'Gayle Laakmann McDowell ','3','400','1','book for interviews','https://m.media-amazon.com/images/P/0984782850.01._SCLZZZZZZZ_SX500_.jpg','2','50','0');
 ('Cracking the Coding Interview: 189 Programming Questions and Solutions',null,null,'Gayle Laakmann McDowell ','3','400','1','book for interviews','https://edit.org/images/cat/book-covers-big-2019101610.jpg');


