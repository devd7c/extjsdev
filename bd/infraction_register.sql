-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2015 at 03:52 PM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unionextjs`
--

-- --------------------------------------------------------

--
-- Table structure for table `infraction_register`
--

CREATE TABLE IF NOT EXISTS `infraction_register` (
  `infractionregisterid` int(11) NOT NULL,
  `infractionid` int(11) NOT NULL,
  `vehicleid` int(11) NOT NULL,
  `infractionnumberticket` varchar(155) DEFAULT NULL,
  `infractionregisterstate` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infraction_register`
--

INSERT INTO `infraction_register` (`infractionregisterid`, `infractionid`, `vehicleid`, `infractionnumberticket`, `infractionregisterstate`) VALUES
(1, 2, 1, '5270700dsdsds', 'Pagado');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `infraction_register`
--
ALTER TABLE `infraction_register`
  ADD PRIMARY KEY (`infractionregisterid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `infraction_register`
--
ALTER TABLE `infraction_register`
  MODIFY `infractionregisterid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
