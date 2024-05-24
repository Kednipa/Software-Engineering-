-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: hospitalityproperty
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cleaningappointment`
--

DROP TABLE IF EXISTS `cleaningappointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cleaningappointment` (
  `dateTime` datetime DEFAULT NULL,
  `cleaningStaff_id` int DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `cleaningAppointment_id` int NOT NULL,
  `PK_CleaningStaff` int DEFAULT NULL,
  PRIMARY KEY (`cleaningAppointment_id`),
  KEY `FK_CleaningAppointment_(cleaningStaff_id = cleaningStaff_id)` (`PK_CleaningStaff`),
  CONSTRAINT `FK_CleaningAppointment_(cleaningStaff_id = cleaningStaff_id)` FOREIGN KEY (`PK_CleaningStaff`) REFERENCES `cleaningstaff` (`cleaningStaff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The CleaningAppointment table holds records of scheduled cleaning appointments. Each appointment entry includes the date and time of the appointment and its corresponding price. Additionally, it references a specific staff member from the CleaningStaff table who is assigned to carry out the cleaning.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cleaningappointment`
--

LOCK TABLES `cleaningappointment` WRITE;
/*!40000 ALTER TABLE `cleaningappointment` DISABLE KEYS */;
INSERT INTO `cleaningappointment` VALUES ('2024-05-14 12:00:00',301,500.00,30123,NULL);
/*!40000 ALTER TABLE `cleaningappointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cleaningstaff`
--

DROP TABLE IF EXISTS `cleaningstaff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cleaningstaff` (
  `calendar` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `cleaningStaff_id` int NOT NULL,
  `PK_User` int DEFAULT NULL,
  PRIMARY KEY (`cleaningStaff_id`),
  KEY `FK_CleaningStaff_(user_id = user_id)` (`PK_User`),
  CONSTRAINT `FK_CleaningStaff_(user_id = user_id)` FOREIGN KEY (`PK_User`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The CleaningStaff table contains information about the staff members responsible for cleaning tasks. Each staff member''s schedule is recorded in the calendar column.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cleaningstaff`
--

LOCK TABLES `cleaningstaff` WRITE;
/*!40000 ALTER TABLE `cleaningstaff` DISABLE KEYS */;
INSERT INTO `cleaningstaff` VALUES ('2024-05-14',102,301,NULL);
/*!40000 ALTER TABLE `cleaningstaff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `user_id` int DEFAULT NULL,
  `guest_id` int NOT NULL,
  `customerRatings` int DEFAULT NULL,
  `reservation_id` int DEFAULT NULL,
  `PK_User` int DEFAULT NULL,
  `PK_Reservation` int DEFAULT NULL,
  PRIMARY KEY (`guest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The Guest table holds records pertaining to guests or customers who engage with the system. Information stored includes guest ID, reservation ID and potentially other data such as booking history, or booking history.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES (101,101,5,10546,NULL,NULL);
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspector`
--

DROP TABLE IF EXISTS `inspector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspector` (
  `user_id` int DEFAULT NULL,
  `inspector_id` int NOT NULL,
  PRIMARY KEY (`inspector_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The Inspector table is dedicated to storing information about property inspectors such as their ID.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspector`
--

LOCK TABLES `inspector` WRITE;
/*!40000 ALTER TABLE `inspector` DISABLE KEYS */;
INSERT INTO `inspector` VALUES (101,501),(102,502);
/*!40000 ALTER TABLE `inspector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner` (
  `user_id` int DEFAULT NULL,
  `owner_id` int NOT NULL,
  `PK_User` int DEFAULT NULL,
  PRIMARY KEY (`owner_id`),
  KEY `FK_Owner_(user_id = user_id)` (`PK_User`),
  CONSTRAINT `FK_Owner_(user_id = user_id)` FOREIGN KEY (`PK_User`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The Owner table serves to capture information about property owners. Entries in this table contain data such as the Host ID.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES (102,102,NULL);
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `address` varchar(50) DEFAULT NULL,
  `availability` date DEFAULT NULL,
  `dailyrate` double(10,2) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `images` blob,
  `locationRatings` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  `reservation_id` int DEFAULT NULL,
  `property_id` int NOT NULL,
  `PK_Host` int DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `FK_Property_(host_id = host_id)` (`PK_Host`),
  CONSTRAINT `FK_Property_(host_id = host_id)` FOREIGN KEY (`PK_Host`) REFERENCES `owner` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The Property table maintains records of properties available for rental or cleaning services. Each property entry includes details such as its address, availability dates, daily rental rate, description, an image of the property, location ratings, property name, and a boolean value indicating whether the property has been verified.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES ('482 Odense, Denmark','2024-05-12',1500.00,'Near city center, 1 bedroom with personal bathroom','',3,'CozyHome',1,NULL,NULL,9870,NULL),('Silom, Bangkok','2024-04-26',1300.00,'Center of Bangkok, Close to the metro','',4,'Centara Host',1,102,NULL,13579,NULL);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `fromDateTime` date DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `toDateTime` date DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `reservation_id` int NOT NULL,
  `PK_Property` int DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `FK_Reservation_(property_id = property_id)` (`PK_Property`),
  CONSTRAINT `FK_Reservation_(property_id = property_id)` FOREIGN KEY (`PK_Property`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The Reservation table keeps track of reservations made for properties. Each reservation entry contains the start and end dates and times of the reservation, as well as the corresponding price.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES ('2024-05-12',3000.00,'2024-05-14',9870,10546,NULL);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `portrait` blob,
  `contactInformation` varchar(50) DEFAULT NULL,
  `user_id` int NOT NULL,
  `FK_Inspector_User` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_User_(user_id = user_id)` (`FK_Inspector_User`),
  CONSTRAINT `FK_User_(user_id = user_id)` FOREIGN KEY (`FK_Inspector_User`) REFERENCES `inspector` (`inspector_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The User table stores details about users within the system. Each user entry includes a unique identifier, their first and last names, contact information and optionally, a portrait image stored in binary format.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Anna','Belle','','AnnaBelle@gmail.com',101,NULL),('Adrain','Ford','','Adrain485Ford@gmail.com',102,NULL),('Laura','Lee','','LeeLaura@gmail.com',103,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hospitalityproperty'
--
/*!50003 DROP FUNCTION IF EXISTS `calculateReservationPrice` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `calculateReservationPrice`(
    p_property_ID INT,
    p_fromDateTime DATETIME,
    p_toDateTime DATETIME,
    p_price DOUBLE
) RETURNS double
    DETERMINISTIC
BEGIN
    DECLARE calculated_price DOUBLE;
    SET calculated_price = TIMESTAMPDIFF(DAY, p_fromDateTime, p_toDateTime) * p_price; 
    RETURN calculated_price;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AddCleaningStaff` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddCleaningStaff`(
    IN p_calendar DATE,
    IN p_user_id INT,
    IN p_cleaningStaff_id INT
)
BEGIN
    INSERT INTO CleaningStaff (calendar, user_id, cleaningStaff_id)
    VALUES (p_calendar, p_user_id, p_cleaningStaff_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AddInspector` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddInspector`(
    IN p_inspector_id INT,
    IN p_user_id INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM inspector WHERE inspector_id = p_inspector_id) THEN
        UPDATE inspector SET user_id = p_user_id WHERE inspector_id = p_inspector_id;
    ELSE
        INSERT INTO inspector (inspector_id, user_id) VALUES (p_inspector_id, p_user_id);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateProperty` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateProperty`(
    IN p_address VARCHAR(50),
    IN p_property_id INT,
    IN p_owner_id INT,
    IN p_availability DATE,
    IN p_dailyRate DOUBLE(10,2),
    IN p_description VARCHAR(250),
    IN p_images BLOB,
    IN p_locationRatings INT,
    IN p_name VARCHAR(50),
    IN p_verified BOOL
)
BEGIN
    INSERT INTO Property (address, property_id, owner_id, availability, dailyRate, description, images, locationRatings, name, verified)
    VALUES (p_address, p_property_id, p_owner_id,  p_availability, p_dailyRate, p_description, p_images, p_locationRatings, p_name, p_verified);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreatePropertyWithImage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreatePropertyWithImage`(
    IN p_address VARCHAR(50),
    IN p_property_id INT,
    IN p_availability DATE,
    IN p_dailyRate DOUBLE(10,2),
    IN p_description VARCHAR(250),
    IN p_imagePath VARCHAR(255),  -- Path to the image file
    IN p_locationRatings INT,
    IN p_name VARCHAR(50),
    IN p_verified BOOL
)
BEGIN
    DECLARE image_data LONGBLOB;

    SELECT LOAD_FILE(p_imagePath) INTO image_data;

    INSERT INTO Property (address, property_id, availability, dailyRate, description, images, locationRatings, name, verified)
    VALUES (p_address, p_property_id, p_availability, p_dailyRate, p_description, image_data, p_locationRatings, p_name, p_verified);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateReservation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateReservation`(
    IN p_property_ID INT,
	IN p_reservation_id INT,
    IN p_fromDateTime DATE,
    IN p_toDateTime DATE,
    IN p_price DOUBLE
)
BEGIN
    INSERT INTO Reservation (property_ID, reservation_id, fromDateTime, toDateTime, price)
    VALUES (p_property_ID, p_reservation_id, p_fromDateTime, p_toDateTime, calculateReservationPrice(p_property_ID, p_fromDateTime, p_toDateTime, p_price));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CreateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser`(
    IN p_firstName VARCHAR(50),
    IN p_lastName VARCHAR(50),
    IN p_contactInformation VARCHAR(50),
    IN p_portrait BLOB,
    IN p_user_id INT
)
BEGIN
    INSERT INTO User (firstName, lastName, contactInformation, portrait, user_id)
    VALUES (p_firstName, p_lastName, p_contactInformation, p_portrait, p_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GuestReview` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GuestReview`(
    IN p_reservation_ID INT,
    IN p_guest_id INT,
    IN p_customerRatings INT
)
BEGIN
    UPDATE Guest 
    SET reservation_ID = p_reservation_ID, customerRatings = p_customerRatings
    WHERE guest_id = p_guest_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegisterGuest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterGuest`(
    IN p_user_ID INT
    -- IN p_guest_id INT
)
BEGIN
    DECLARE guest_user_ID INT;
    
    SELECT user_ID INTO guest_user_ID FROM User WHERE user_ID = p_user_ID;

    INSERT INTO Guest ( user_ID, guest_id)
    VALUES ( p_user_ID, guest_user_ID);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegisterOwner` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterOwner`(
    IN p_user_ID INT
    -- IN p_guest_id INT
)
BEGIN
    DECLARE owner_user_ID INT;
    
    SELECT user_ID INTO owner_user_ID FROM User WHERE user_ID = p_user_ID;

    INSERT INTO Owner ( user_ID, owner_id)
    VALUES ( p_user_ID, owner_user_ID);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ScheduleCleaningAppointment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ScheduleCleaningAppointment`(
    IN p_cleaningappointment_id INT,
    IN p_dateTime DATETIME,
    IN p_cleaningStaff_ID INT,
    IN p_price DOUBLE(10,2)
)
BEGIN
    INSERT INTO CleaningAppointment (cleaningappointment_id, dateTime, CleaningStaff_ID, Price)
    VALUES (p_cleaningappointment_id, p_dateTime, p_cleaningStaff_ID, p_price);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdatePropertyOwner` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdatePropertyOwner`(
    IN p_property_ID INT,
    IN p_owner_id INT
)
BEGIN
    UPDATE Property
    SET owner_id = p_owner_id
    WHERE property_ID = p_property_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 19:44:21
