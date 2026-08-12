CREATE SCHEMA studentmanagementsystem;

CREATE TABLE `student` (
   `id` bigint NOT NULL,
   `address` varchar(255) NOT NULL,
   `course` varchar(255) NOT NULL,
   `date_of_joining` datetime(6) DEFAULT NULL,
   `email` varchar(255) NOT NULL,
   `gender` varchar(255) NOT NULL,
   `mobile` varchar(255) NOT NULL,
   `name` varchar(50) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `UK1hacy9sv2k3lqxh111wqi0vri` (`mobile`,`email`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci