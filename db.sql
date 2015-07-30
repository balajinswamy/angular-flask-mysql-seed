-- MySQL dump 10.13  Distrib 5.5.17, for osx10.6 (i386)
--
-- Host: localhost    Database: truecar
-- ------------------------------------------------------
-- Server version	5.5.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `vsn_details`
--

DROP TABLE IF EXISTS `vsn_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vsn_details` (
  `vsn` varchar(12) DEFAULT NULL,
  `trim` int(6) DEFAULT NULL,
  `year` int(4) DEFAULT NULL,
  `make` varchar(20) DEFAULT NULL,
  `model` varchar(3) DEFAULT NULL,
  `trim_name` varchar(40) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vsn_details`
--

LOCK TABLES `vsn_details` WRITE;
/*!40000 ALTER TABLE `vsn_details` DISABLE KEYS */;
INSERT INTO `vsn_details` VALUES ('XXRC*V******',253913,2013,'Volkswagen','GTI','2-Door Autobahn'),('XZTE*V******',253913,2013,'Volkswagen','GTI','2-Door Autobahn'),('WYTE*V******',253911,2013,'Volkswagen','GTI','2-Door Autobahn'),('WWRC*V******',253911,2013,'Volkswagen','GTI','2-Door Autobahn'),('WWRC*V******',253903,2013,'Volkswagen','GTI','2-Door with Convenience and Sunroof'),('XZTE*V******',253905,2013,'Volkswagen','GTI','2-Door with Convenience and Sunroof'),('XXRC*V****3*',253905,2013,'Volkswagen','GTI','2-Door with Convenience and Sunroof'),('XXRC*V*12***',253905,2013,'Volkswagen','GTI','2-Door with Convenience and Sunroof'),('XXRC*V******',253909,2013,'Volkswagen','GTI','2-Door with Sunroof and Navigation'),('XZTE*V******',253909,2013,'Volkswagen','GTI','2-Door with Sunroof and Navigation'),('WWRC*V******',253907,2013,'Volkswagen','GTI','2-Door with Sunroof and Navigation'),('WYTE*V******',253907,2013,'Volkswagen','GTI','2-Door with Sunroof and Navigation'),('ZZRC*V***4**',253929,2013,'Volkswagen','GTI','4-Door Autobahn'),('ZJTE*V******',253929,2013,'Volkswagen','GTI','4-Door Autobahn'),('YYRC*V******',253927,2013,'Volkswagen','GTI','4-Door Autobahn'),('YGTE*V******',253927,2013,'Volkswagen','GTI','4-Door Autobahn'),('ZJTE*V******',253917,2013,'Volkswagen','GTI','4-Door'),('ZZRC*V******',253917,2013,'Volkswagen','GTI','4-Door'),('ZJTE*V******',253921,2013,'Volkswagen','GTI','4-Door with Convenience and Sunroof'),('ZZRC*V******',253921,2013,'Volkswagen','GTI','4-Door with Convenience and Sunroof'),('WYTE*V******',253903,2013,'Volkswagen','GTI','2-Door with Convenience and Sunroof'),('YGTE*V******',253919,2013,'Volkswagen','GTI','4-Door with Convenience and Sunroof'),('YYRC*V******',253919,2013,'Volkswagen','GTI','4-Door with Convenience and Sunroof'),('ZJTE*V******',253925,2013,'Volkswagen','GTI','4-Door with Sunroof and Navigation'),('ZZRC*V******',253925,2013,'Volkswagen','GTI','4-Door with Sunroof and Navigation'),('ZJTE*V000000',253923,2013,'Volkswagen','GTI','4-Door with Sunroof and Navigation'),('YGTE*V******',253923,2013,'Volkswagen','GTI','4-Door with Sunroof and Navigation'),('YYRC*V******',253923,2013,'Volkswagen','GTI','4-Door with Sunroof and Navigation'),('ZJTE*V******',259175,2013,'Volkswagen','GTI','Driver\'s Edition'),('ZZRC*V******',259175,2013,'Volkswagen','GTI','Driver\'s Edition'),('YGTE*V******',259173,2013,'Volkswagen','GTI','Driver\'s Edition'),('YYRC*V******',259173,2013,'Volkswagen','GTI','Driver\'s Edition'),('ZZRC*V***44*',258328,2013,'Volkswagen','GTI','Wolfsburg Edition'),('ZZRC*V******',258326,2013,'Volkswagen','GTI','Wolfsburg Edition');
/*!40000 ALTER TABLE `vsn_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'truecar'
--
/*!50003 DROP PROCEDURE IF EXISTS `getVSNInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `getVSNInfo`(in i_vsn char(12))
BEGIN

   SELECT vsn, trim, year, make, model, trim_name FROM vsn_details
   where SUBSTRING(vsn,1,1) in (SUBSTRING(i_vsn,1,1), '*')
   and SUBSTRING(vsn,2,1) in (SUBSTRING(i_vsn,2,1), '*')
   and SUBSTRING(vsn,3,1) in (SUBSTRING(i_vsn,3,1), '*')
   and SUBSTRING(vsn,4,1) in (SUBSTRING(i_vsn,4,1), '*')
   and SUBSTRING(vsn,5,1) in (SUBSTRING(i_vsn,5,1), '*')
   and SUBSTRING(vsn,6,1) in (SUBSTRING(i_vsn,6,1), '*')
   and SUBSTRING(vsn,7,1) in (SUBSTRING(i_vsn,7,1), '*')
   and SUBSTRING(vsn,8,1) in (SUBSTRING(i_vsn,8,1), '*')
   and SUBSTRING(vsn,9,1) in (SUBSTRING(i_vsn,9,1), '*')
   and SUBSTRING(vsn,10,1) in (SUBSTRING(i_vsn,10,1), '*')
   and SUBSTRING(vsn,11,1) in (SUBSTRING(i_vsn,11,1), '*')
   and SUBSTRING(vsn,12,1) in (SUBSTRING(i_vsn,12,1), '*')
   order by length(vsn) - length(REPLACE(vsn, '*', ''))
   limit 0,1;
	
END */;;
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

-- Dump completed on 2015-07-30  1:24:30
