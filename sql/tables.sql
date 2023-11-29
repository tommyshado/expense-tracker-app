
CREATE TABLE category (
   id serial primary key,
   category_type text NOT NULL,
);

CREATE TABLE expense (
   id serial primary key,
   expense text not null,
   amount numeric not null, 
   total numeric not null,  
   category_id int not null,
   foreign key (category_id) reference category(id)
);

INSERT into category (category_type) values ('weekly');
INSERT into category (category_type) values ('monthly');
INSERT into category (category_type) values ('weekday');
INSERT into category (category_type) values ('weekend');
INSERT into category (category_type) values ('once-off');
INSERT into category (category_type) values ('daily');