SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `coding-school` DEFAULT CHARACTER SET utf8 ;
USE `coding-school` ;

-- -----------------------------------------------------
-- Table `coding-school`.`roles`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `coding-school`.`roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `coding-school`.`administrator`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `coding-school`.`administrator` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `role` INT(11) NOT NULL ,
  `phone` VARCHAR(45) NOT NULL ,
  `email` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(15) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_administrator_role_idx` (`role` ASC) ,
  CONSTRAINT `fk_administrator_role `
    FOREIGN KEY (`role` )
    REFERENCES `coding-school`.`roles` (`id` ))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `coding-school`.`courses`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `coding-school`.`courses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `description` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 103
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `coding-school`.`students`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `coding-school`.`students` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `phone` VARCHAR(45) NOT NULL ,
  `email` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 42
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `coding-school`.`courses_students`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `coding-school`.`courses_students` (
  `crs_id` INT(11) NOT NULL ,
  `stdnt_id` INT(11) NOT NULL ,
  PRIMARY KEY (`crs_id`, `stdnt_id`) ,
  INDEX `fk_cs_students_idx` (`stdnt_id` ASC) ,
  CONSTRAINT `fk_cs_courses`
    FOREIGN KEY (`crs_id` )
    REFERENCES `coding-school`.`courses` (`id` ),
  CONSTRAINT `fk_cs_students`
    FOREIGN KEY (`stdnt_id` )
    REFERENCES `coding-school`.`students` (`id` ))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `coding-school` ;

-- -----------------------------------------------------
-- function Split_String
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `Split_String`(
 x VARCHAR(255),
 delim VARCHAR(12),
 pos INT
 ) RETURNS varchar(255) CHARSET utf8
RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),
delim, '')$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_admin_exists
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_admin_exists`(IN adminName VARCHAR(45),
																 IN adminEmail VARCHAR(45))
BEGIN

	select id FROM administrator
    where BINARY name = adminName
    and email = adminEmail;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_course_exists
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_course_exists`(IN courseName VARCHAR(45))
BEGIN

	select ifnull((	select id 
					from courses 
					where binary name = courseName) ,-1) as duplicateCourseID;

    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_student_exists
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_student_exists`(IN studentName VARCHAR(45),
																   in studentPhone VARCHAR(45),
																   in studentEmail VARCHAR(45))
BEGIN

	SELECT id FROM students 
	WHERE BINARY name = studentName 
	and BINARY phone = studentPhone
	and BINARY email = studentEmail;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_administrator
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_administrator`(IN adminID int)
BEGIN

	delete from  `coding-school`.`administrator` where id = adminID;
        
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_course
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_course`(IN courseID int)
BEGIN

    delete from  `coding-school`.`courses` where id = courseID;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_student
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_student`(IN studentID int)
BEGIN

	delete from  `coding-school`.`courses_students` where stdnt_id = studentID;
    delete from  `coding-school`.`students` where id = studentID;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_administrator_by_login
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_administrator_by_login`(IN email VARCHAR(45),  in password  VARCHAR(15))
BEGIN

	SELECT   administrator.id as adminID,
			 administrator.name as adminName,
			 administrator.role as roleID,
             roles.name as roleName,
             administrator.phone as adminPhone,
             administrator.email as adminEmail,
             administrator.password as adminPassword             
	FROM administrator
	inner join roles
	on administrator.role = roles.id
    where administrator.email = email
    and administrator.password = password;
   
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_administrators
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_administrators`()
BEGIN

	SELECT   administrator.id as adminID,
			 administrator.name as adminName,
			 administrator.role as roleID,
             roles.name as roleName,
             administrator.phone as adminPhone,
             administrator.email as adminEmail
	FROM administrator
	inner join roles
	on administrator.role = roles.id;
   
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_courses
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_courses`()
BEGIN
	SELECT   id,
			 name as courseName,
             description as courseDescription,
             ifNull(number_of_students_for_course, 0) as numberOfStudentsForCourse,  #students_found_for_course
			 ifNull(student_ids, "") as studentIDs	
    FROM courses
    left outer join   
		(select count(*) as number_of_students_for_course ,crs_id
		 from courses_students 
		 group by crs_id) AS student_numbers
		 ON  student_numbers.crs_id = courses.id
    left outer JOIN                                       
		(SELECT  group_concat(concat(stdnt_id)  order by student_name separator ',') as student_ids ,crs_id        
		 FROM ( select crs_id, stdnt_id, name as student_name 
				from courses_students 
				inner join students
				on students.id = courses_students.stdnt_id) as courses_students
		 group by   crs_id ) as students
    on students.crs_id = courses.id
    order by  courses.name;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_roles
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_roles`()
BEGIN

	SELECT   id as roleID,
			 name as roleName
	FROM roles
    order by  name;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_students
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_students`()
BEGIN

	SELECT   students.id,
			 students.name as studentName,
			 students.phone as studentPhone,
			 students.email as studentEmail,
			 ifNull(courses.student_courses, "") as studentCourses 
		FROM students
		left outer  JOIN                                       
			( SELECT  group_concat(concat(concat("cbCourse", crs_id)) order by course_name separator ',') as student_courses ,stdnt_id        
			  FROM  ( select crs_id, stdnt_id, name as course_name 
					  from courses_students 
					  inner join courses
					  on courses.id = courses_students.crs_id) as courses_students
			  group by   stdnt_id) AS courses
		ON  courses.stdnt_id = students.id
	order by  students.name;
		
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_administrator
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_administrator`(IN adminName VARCHAR(45),
																   IN adminEmail VARCHAR(45),
																   IN roleID int,
																   IN adminPhone VARCHAR(45),
																   IN adminPassword VARCHAR(15))
BEGIN

	DECLARE new_admin_id int;

    INSERT INTO `coding-school`.`administrator`
	(`name`,
	`role`,
	`phone`,
	`email`,
	`password`)
	VALUES
	(adminName,
	 roleID,
	 adminPhone,
	 adminEmail,
	 adminPassword); 
    
    SELECT LAST_INSERT_ID()
    INTO new_admin_id;
    SELECT new_admin_id;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_course
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_course`(IN courseName VARCHAR(45),
															IN courseDescription VARCHAR(255))
BEGIN

	DECLARE new_course_id int;

    INSERT INTO `coding-school`.`courses`
    (`name`, description) 
    VALUES 
    (courseName, courseDescription);    
    
    SELECT LAST_INSERT_ID()
    INTO new_course_id;
    SELECT new_course_id;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_student
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_student`(in studentName VARCHAR(45),
									in studentPhone VARCHAR(45),
									in studentEmail VARCHAR(45),
                                    in studentCourses varchar(255))
BEGIN

	DECLARE string_position INT Default 0 ; #used to extract individual course from courses string in course_loop
    DECLARE course VARCHAR(255); #used to extract individual course from courses string in course_loop
    DECLARE new_student_id int; #used as student_id for insert into courses_students table  

	# handling for sqlexception & sqlwarning - if occurs rollback and return 
    #new_student_id = -1 to php for further error handling on server
	DECLARE exit handler for sqlexception 
	  BEGIN
		ROLLBACK; -- error
		set new_student_id = -1;
        SELECT new_student_id;
	  END;

	DECLARE exit handler for sqlwarning
	 BEGIN
		ROLLBACK; -- WARNING
		set new_student_id = -1;
        SELECT new_student_id;
	 END;

	START TRANSACTION;
    
		INSERT INTO students
		(`name`, 
		 phone,
		 email
		) 
		VALUES 
		(studentName, 
		 studentPhone,
		 studentEmail);    
		
		SELECT LAST_INSERT_ID()
		INTO new_student_id;
		
		#loop over courses string and insert row into courses_students for every row extracted 
		course_loop: while string_position < 255 
			do
			 SET string_position = string_position + 1;
			 SET course = Split_String(studentCourses, ",", string_position);
			 IF course = '' THEN
				LEAVE course_loop;
			 END IF;
			 insert into courses_students values (course, new_student_id);
		end while;

		SELECT new_student_id; #if insert successful return student_id of row inserted to php

    COMMIT;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_administrator
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_administrator`(IN adminID Int, 
																   IN adminName VARCHAR(45),
																   IN adminEmail VARCHAR(45),	
																   IN roleID Int,
																   IN adminPhone VARCHAR(45))
BEGIN

    update administrator
	set name = adminName,
		role = roleID,
		phone = adminPhone,
		email = adminEmail
	where id = adminID;   
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_course
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_course`(IN courseID Int, 
															IN courseName VARCHAR(45),
															IN courseDescription VARCHAR(255))
BEGIN

    update courses
	set name = courseName,
		description = courseDescription
	where id = courseID;   
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_student
-- -----------------------------------------------------

DELIMITER $$
USE `coding-school`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_student`(in studentID int,
															 in studentName VARCHAR(45),
															 in studentPhone VARCHAR(45),
															 in studentEmail VARCHAR(45),
															 in studentCourses varchar(255))
BEGIN

	DECLARE string_position INT Default 0 ; #used to extract individual course from courses string in course_loop
    DECLARE course VARCHAR(255); #used to extract individual course from courses string in course_loop

	# handling for sqlexception & sqlwarning - if occurs rollback and return student_id = -1 to php for further error handling on server
	DECLARE exit handler for sqlexception 
	  BEGIN
		ROLLBACK; -- error
		set studentID = -1;
        SELECT studentID;
	  END;

	DECLARE exit handler for sqlwarning
	 BEGIN
		ROLLBACK; -- WARNING
		set studentID = -1;
        SELECT studentID;
	 END;

	START TRANSACTION;
    
		UPDATE `coding-school`.students
		SET
		name = studentName,
		phone = studentPhone,
		email = studentEmail
		WHERE id = studentID;
		
		# delete all courses for student and then reinsert them according to input parm student_courses
		delete from courses_students where stdnt_id = studentID;
		
		#loop over courses string and insert row into courses_students for every row extracted 
		course_loop: while string_position < 255 
			do
			 SET string_position = string_position + 1;
			 SET course = Split_String(studentCourses, ",", string_position);
			 IF course = '' THEN
				LEAVE course_loop;
			 END IF;
			 insert into courses_students values (course, studentID);
		end while;

		SELECT studentID; #return student_id to php - if -1 update failes

    COMMIT;

END$$

DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
