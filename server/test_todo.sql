DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS account;

-- Create account table
CREATE TABLE account (
  id serial PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

create table task (
  id serial primary key,
  description text not null
);
insert into task (description) values ('my test task');
insert into task (description) values ('my another test task');