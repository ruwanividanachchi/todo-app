drop table if exists task;

drop table if exists account;

create table account (
  id serial primary key,
  email varchar(255) not null
);

create table task (
  id serial primary key,
  description text not null
);

insert into task (description) values ('my test task');
insert into task (description) values ('my another test task');
select * from account;
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'account';
ALTER TABLE account ADD COLUMN password VARCHAR(255) NOT NULL;



