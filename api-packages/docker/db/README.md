docker exec -it db_db_1 bash
mysql -u root -p
create database songc;
grant all privileges on songc.* TO 'songc'@'%' identified by 'songc!';
flush privileges;