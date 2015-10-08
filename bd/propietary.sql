-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2015 at 03:34 PM
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
-- Table structure for table `propietary`
--

CREATE TABLE IF NOT EXISTS `propietary` (
  `propietaryid` int(11) NOT NULL,
  `propietaryfirstname` varchar(55) DEFAULT NULL,
  `propietarylastname` varchar(55) DEFAULT NULL,
  `propietaryci` varchar(45) DEFAULT NULL,
  `propietaryadress` varchar(155) DEFAULT NULL,
  `propietaryphone` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propietary`
--

INSERT INTO `propietary` (`propietaryid`, `propietaryfirstname`, `propietarylastname`, `propietaryci`, `propietaryadress`, `propietaryphone`) VALUES
(1, 'Guido', 'Terceros Fernandez', '5270700', 'moxos 1537', '70735194');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `propietary`
--
ALTER TABLE `propietary`
  ADD PRIMARY KEY (`propietaryid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `propietary`
--
ALTER TABLE `propietary`
  MODIFY `propietaryid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
