-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2015 at 04:37 AM
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
-- Table structure for table `card_operation`
--

CREATE TABLE IF NOT EXISTS `card_operation` (
  `cardoperationid` int(11) NOT NULL,
  `operatorregisterid` int(11) NOT NULL,
  `vehicleid` int(11) NOT NULL,
  `nameprincipal` varchar(255) DEFAULT NULL,
  `namesecretary` varchar(255) DEFAULT NULL,
  `cardoperationvalidity` date DEFAULT NULL,
  `cardoperationstatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `card_operation`
--

INSERT INTO `card_operation` (`cardoperationid`, `operatorregisterid`, `vehicleid`, `nameprincipal`, `namesecretary`, `cardoperationvalidity`, `cardoperationstatus`) VALUES
(1, 2, 11, 'ddfd', 'fdfdfdf', '2015-10-14', 'Activo'),
(2, 3, 10, 'fgfgffg', 'fgfg', '2015-10-21', 'Activo'),
(3, 1, 13, '45545454', 'sdsdsd', '2015-10-13', 'Pendiente');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card_operation`
--
ALTER TABLE `card_operation`
  ADD PRIMARY KEY (`cardoperationid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `card_operation`
--
ALTER TABLE `card_operation`
  MODIFY `cardoperationid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
